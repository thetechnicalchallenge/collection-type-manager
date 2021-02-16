# Collection Type Manager
Javascript library to easily interact with [Symfony CollectionType Field](https://symfony.com/doc/current/reference/forms/types/collection.html) 

* [Installation](#installation)
* [Usage](#usage)
* [Basic configuration](#basic-configuration)
* [Event system](#event-system)
* [Child collection](#child-collections)
* [The Sortable implementation](#the-sortable-implementation)

## Installation
```bash
npm i collection-type-manager
```
```js
import CollectionTypeManager from "collection-type-manager";
```
## Usage
In this documentation, we will use the example of a `QuizType` form with a `questions` field as a `CollectionType` 
but feel free to adapt it to your logic. Later, `QuestionType` will contain an `options` field as a `CollectionType`, 
this will allow you to understand how to manage child collections like for a MCQ.

## Basic configuration

### In QuizType
First, set `allow_add` and `allow_delete` to true.
```php
$builder  
  ->add('questions', CollectionType::class, [  
    'entry_type' => QuestionType::class,  
    'allow_add' => true,  
    'allow_delete' => true,  
  ])  
;
```
### Twig Form Theme
The easiest way to create your design is to create a [form theme](https://symfony.com/doc/current/form/form_themes.html). 
If you are not familiar with the form themes, I propose you to read the doc and to implement a theme in [the same template as your form](https://symfony.com/doc/current/form/form_themes.html#creating-a-form-theme-in-the-same-template-as-the-form)
as a first step. [Fragment Naming for Collections](https://symfony.com/doc/current/form/form_themes.html#fragment-naming-for-collections) is the essential chapter to understand the twig code we will use throughout this documentation.

Following the logic of our example, here is a basic customizable example for a collection of questions:

*`id` and `data attributes` are necessary for the internal functioning of the library.*
```twig
{% block _quiz_questions_widget %}  
  <ul id="question-list" 
    data-prototype="{{ form_widget(form.vars.prototype)|e }}" 
    data-counter="{{ form|length }}">  
    {% for question in form %}  
      {{ form_widget(question) }}  
    {% endfor %}  
  </ul>  
    
  <button type="button" 
    data-target="#question-list" 
    id="add-question">Add</button>  
{% endblock %}  
  
{% block _quiz_questions_entry_widget %}  
  <li id="{{ id }}">  
    {{ form_row(form.question) }} 
    {{ form_row(form.answer) }} 
    <button type="button" 
      data-target="{{ id }}" 
      class="remove-question"> Remove </button>  
  </li>
{% endblock %}
```
Pay attention to the HTML tags of the container's children in case you use the [Sortable implementation](#the-sortable-implementation). 
An `ul` container cannot have `div` children. Use a `div` container if you want `div` children.

In addition, the collection elements must be directly children of the container:
```html
<ul id="question-list" /.../ > <li> ... </li> </ul>
```

### CollectionTypeManager instantiation
Here is what the minimum configuration looks like:
```js
import CollectionTypeManager from "collection-type-manager";

const QuestionCollection = new CollectionTypeManager({  
  containerId: 'question-list', // the container id of your collection
  addButtonId: 'add-question', // the button id for adding a widget
  removeButtonsClassName: 'remove-question', // the class of all the remove buttons
});

```
If your needs are basic, you know enough to use this library.

## Event system

The collection-type-manager library comes with an internal event manager to which you can connect from the `subscriber` property.

Short example:
```js
import CollectionTypeManager, { Subscriber } from "collection-type-manager";

const QuestionCollection = new CollectionTypeManager({
  // prev code...
  
  // property subscriber is a callback wich return an instance of Subscriber
  subscriber: function () {
    const subscriber = new Subscriber();
    subscriber.subscribe('after.add.widget', function () {
      // Your logic...
      
      // In 'after.add.widget' event, you can access the last added widget.
      const lastWidget = QuestionCollection.getLastWidgetAdded();

      // Your logic...
    });
    
    subscriber.subscribe(['after.add.widget', 'after.remove.widget'], function () {
      // Your logic...        
    });

    return subscriber;
  }
});
```
You can directly pass the name of the event you want to connect with, but you also can pass an array of events 
to execute the same action at several points in the workflow.

Events available: `mount`, `before.add.widget`, `after.add.widget`, `before.remove.widget`, `after.remove.widget`.

> Be careful, `mount` is triggered at the end of the `constructor` method of `CollectionTypeManager` which means that the 
> collection system is created but the instance is not yet usable.

## Child collections

There are two main ways to manage child collections:
* By configuring `ChildCollection` classes that will allow automatic management of your child collections
* By instantiating your child collections yourself.

The configuration of forms and twig blocks can be similar in both cases.

### In QuestionType
Following our example, we add an `options` field to `QuestionType`:
```php
$builder  
  ->add('options', CollectionType::class, [  
   'label' => false,  
   'entry_type' => OptionType::class,  
   'allow_add' => true,  
   'allow_delete' => true,  
  ])  
;
```

### Form Theme for option collection
After added `{{ form_row(form.options) }}` to the twig block `_quiz_questions_entry_widget`, we can create 
the following blocks: 

> Make sure that the **add** and **remove** buttons are specific to the current child collection through its `id`
> and think about adding a common class, here `option-container`, in order to be able to recover all the containers.

```twig
{% block _quiz_questions_entry_options_widget %}
  <div id="{{ id }}"
    class="option-container" {# We retrieve all the option containers through a common class. #}
    data-prototype="{{ form_widget(form.vars.prototype)|e }}"
    data-counter="{{ form|length }}">
    {% for option in form %}
      {{ form_widget(option) }}
    {% endfor %}
  </div>

  <button type="button" id="add-{{ id }}">Add an option</button>
{% endblock %}

{% block _quiz_questions_entry_options_entry_widget %}
  <div id="{{ id }}">
    {{ form_widget(form) }}
    <button type="button"
      data-target="{{ id }}"
      class="remove-{{ form.parent.vars.id }}">
      Remove
    </button>
  </div>
{% endblock %}
```
> Read again the chapter about [Fragment Naming for Collections](https://symfony.com/doc/current/form/form_themes.html#fragment-naming-for-collections
) if this twig code does not seem obvious to you yet.

### Custom child collections
First, I will show you an example of a custom configuration to help you better understand how 
`ChildCollection` classes work if you decide to use them.

After instantiating the parent collection, we retrieve and instantiate the existing option collections.

```js
let options = Array.from(document.getElementsByClassName('option-container'));
options.forEach(option => {
  const OptionCollection = new CollectionTypeManager({
    containerId: option.id,
    addButtonId: `add-${option.id}`,
    removeButtonsClassName: `remove-${option.id}`,
  });
});
```

But don't forget to subscribe to the `after.add.widget` event in order to manage `OptionCollection` 
after adding a new parent field.

```js
const QuestionCollection = new CollectionTypeManager({
  // prev code...

  subscriber: function () {
    const subscriber = new Subscriber();
    
    subscriber.subscribe('after.add.widget', function () {
      const lastWidget = QuestionCollection.getLastWidgetAdded();

      const optionContainer = lastWidget.querySelector('.option-container');
      const OptionCollection = new CollectionTypeManager({
        containerId: optionContainer.id,
        addButtonId: `add-${optionContainer.id}`,
        removeButtonsClassName: `remove-${optionContainer.id}`,
      });
    });

    return subscriber;
  }
});
```

### ChildCollection classes

> This feature allows you to automate the process described in the [previous chapter](#custom-child-collections). 
> The main disadvantage is the loss of flexibility, only minimal configuration is supported.

The `childCollectionList` property is used to set up an array of `ChildCollection` classes.

```js
import CollectionTypeManager, { ChildCollection } from "collection-type-manager";

const QuestionCollection = new CollectionTypeManager({
  // prev code...
  childCollectionList: [
    new ChildCollection('option-container')
  ],
});
```

`ChildCollection` constructor accept three parameters in reference to the chapter [Form Theme for option collection](#form-theme-for-option-collection): 

```js
new ChildCollection(childCollectionClassName = '', addButtonPrefix = 'add-', removeButtonPrefix = 'remove-');
```

The first is the common class of all the containers of the collection child, second and third allow you to customize the prefixes 
of your **add** and **delete** buttons (prefix with the `id` of the child collection container)

## The Sortable Implementation
*Partially tested implementation: only the simple list and handle features are tested for now.*

The collection type manager component implement the Sortable library:

Some examples of UX possibilities: https://sortablejs.github.io/Sortable

To enable Sortable, you must set the `enableSortable` option to `true`. 
You can change the default configuration and connect to Sortable events using the `sortableConfig` property.

Sortable options: https://github.com/SortableJS/Sortable#options

Example:
```js
import CollectionTypeManager from "collection-type-manager";

const QuestionCollection = new CollectionTypeManager({
  // prev code...
  enableSortable: true,
  sortableConfig: {  
    onEnd: function (/**Event*/evt) {  
      // Your logic
    },
    animation: 300
  }
});
```
> When using Sortable, the names of your form fields are automatically updated to respect the order you have chosen. So you don't have to worry about your 
> request to process your form data.

Cheers.

Contact: thetechnicalchallenge@gmail.com