# collection-type-manager

Javascript library to easily interact with [Symfony CollectionType Field](https://symfony.com/doc/current/reference/forms/types/collection.html#adding-and-removing-items) 

## Installation
```bash
npm i collection-type-manager
```
```js
import CollectionTypeManager from "collection-type-manager";
```
## Usage
In this documentation, we will use the example of a `QuizType` form with a `questions` field as a collection.

### In your Symfony FormType
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
The easiest way to create your design is to create a [form theme](https://symfony.com/doc/current/form/form_themes.html). For this example, I propose you to implement a theme in [the same template as your form](https://symfony.com/doc/current/form/form_themes.html#creating-a-form-theme-in-the-same-template-as-the-form).

Here is a very basic example that you can customize:
```twig
{% block _quiz_questions_widget %}  
  <ul id="question-fields-list" 
    data-prototype="{{ form_widget(form.vars.prototype)|e }}" 
    data-counter="{{ form|length }}">  
    {% for question in form %}  
        {{ form_widget(question) }}  
    {% endfor %}  
  </ul>  
    
  <button type="button" 
    data-target="#question-fields-list" 
    id="add-question-widget">Add</button>  
{% endblock %}  
  
{% block _quiz_questions_entry_widget %}  
  <li id="{{id}}">  
    {{form_row(form.question)}} 
    {{form_row(form.answer)}} 
    <button type="button" 
      data-target="{{id}}" 
      class="remove-question-widget"> Remove </button>  
  </li>
{% endblock %}
```
Pay attention to the HTML tags of the container's children in case you use the Sortable implementation. 
An `ul` container cannot have `div` children. Use a `div` container if you want `div` children.

In addition, the collection elements must be directly children of the container like in the example above:
```html
<ul id="question-fields-list" /.../ > <li id="{{id}}"> ... </li> </ul>
```

### Basic configuration
Here is what the minimum configuration looks like:
```js
import CollectionTypeManager from "collection-type-manager";

const QuizManager = new CollectionTypeManager({  
  containerId: 'question-fields-list', // the container id of your collection
  addButtonId: 'add-question-widget', // the button id for adding a widget
  removeButtonsClassName: 'remove-question-widget', // the class of all the remove buttons
});
```
### Events
Collection-type-manager comes with an internal event manager to which you can connect from the subscriber property.

Short example:
```js
import CollectionTypeManager from "collection-type-manager";
import Subscriber from "collection-type-manager/dist/Subscriber";

const QuestionCollection = new CollectionTypeManager({
  // prev code...
  
  // property subscriber is a callback wich return an instance of Subscriber
  subscriber: function () {
      const subscriber = new Subscriber(); // Instantiate a subscriber
      subscriber.subscribe('after.add.widget', function () {
        // Your logic...
        
        // In 'after.add.widget' event, you have access to the widget just added
        let lastWidget = QuestionCollection.getLastWidgetAdded();
        
      });
      
      subscriber.subscribe('after.remove.widget', function () {
        // Your logic...        
      });

      return subscriber;
  }
});
```
You can directly pass the name of the event you want to connect to but you can also pass an array of events 
to execute the same action at several points in the workflow.

Events available: `mount`, `before.add.widget`, `after.add.widget`, `before.remove.widget`, `after.remove.widget`

### The Sortable Implementation
*Partially tested implementation: only the simple list and handle features are tested for now.*

The collection type manager component implement the library Sortable:

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
When using Sortable, the names of your form fields are automatically updated to respect the order you have chosen. So you don't have to worry about your request to process your form data.

*Feel free to suggest a PR, advices or simply add a star to the [GitHub repository](https://github.com/thetechnicalchallenge/collection-type-manager) if this library seems relevant to you.* 

Cheers.

Contact: thetechnicalchallenge@gmail.com