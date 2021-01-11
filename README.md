# collection-type-manager (Bêta version)

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
Take the time to consult the cited links in order to understand the rest of the documentation and adapt according to your preferences or needs.

Here is a very basic example that you can customize:
*As you can see, the name of your field must begin with an underscore "_" and be converted to [snake case](https://en.wikipedia.org/wiki/Snake_case) format*.

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

### Basic configuration
Here is what the minimum configuration looks like:
```js
const QuizManager = new CollectionTypeManager({  
  containerId: 'question-fields-list', // the container id of your collection
  addButtonId: 'add-question-widget', // the button id for adding a widget
  removeButtonsClassName: 'remove-question-widget', // the class of all the remove buttons
});
```
You can also configure callbacks for three events:
```js
let eventConfig = {
  isBuilt: () => yourAfterBuiltFunction,  
  afterAddElement: () => {  
    // Here you can access to the new widget just added
    QuizManager.getLastWidgetAdded();
  },  
  afterRemoveElement: () => yourAfterRemoveFunction
}
```
### The Sortable Implementation
*This implementation is not fully tested and will not be as long as this library is in bêta.*
The collection type manager component implement the library Sortable:
Some examples of UX possibilities: https://sortablejs.github.io/Sortable

To enable Sortable, you must set the `enableSortable` option to `true`. 
You can change the default configuration and connect to Sortable events using the `sortableConfig` property.

Example:
```js
  
let sortableConfig = {  
  onEnd: function (/**Event*/evt) {  
      // Your logic
  },  
},
```
When using Sortable, the names of your form fields are automatically updated to respect the order you have chosen. So you don't have to worry about your request to process your form data.
Github Options: https://github.com/SortableJS/Sortable#options

*PR and constructive criticism are welcome :)*