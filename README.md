# collection-type-manager (Bêta version)

Javascript library to easily interact with [Symfony CollectionType Field](https://symfony.com/doc/current/reference/forms/types/collection.html#adding-and-removing-items) 

## Installation
```bash
npm i collection-type-manager
```
```js
import CollectionTypeManager from "collection-type-manager";
```

## In your Symfony FormType
First, set `allow_add` and `allow_delete` to true.
```php
$builder  
  ->add('exampleCollection', CollectionType::class, [  
  'entry_type' => ExampleCollection::class,  
  'allow_add' => true,  
  'allow_delete' => true,  
  ])  
;
```

## JavaScript
Here is what the minimum configuration looks like:
```js
const ExampleCollection = new CollectionTypeManager({  
    containerId: 'collection-fields-list', // the container id of your collection
    addButtonId: 'add-collection-widget', // the button id for adding a widget
    removeButtonsClassName: 'remove-collection-widget', // the class of all the remove buttons
});
```
You can also configure callbacks for three events:
```js
let eventConfig = {
    isBuilt: () => yourAfterBuiltFunction,  
    afterAddElement: () => {  
        // Here you can access to the new widget just added
        ExampleCollection.getLastWidgetAdded();
    },  
    afterRemoveElement: () => yourAfterRemoveFunction
}
```

## Form theme
The easiest way to create your design is to create a [form theme](https://symfony.com/doc/current/form/form_themes.html). For this example, I propose you to implement a theme in [the same template as your form](https://symfony.com/doc/current/form/form_themes.html#creating-a-form-theme-in-the-same-template-as-the-form). 

Here is a very basic example that you can customize:
*As you can see, the name of your field must begin with an underscore "_" and be converted to [snake case](https://en.wikipedia.org/wiki/Snake_case) format*.
```twig
{% block _example_collection_widget %}  
{# the container of widgets #}
<ul id="collection-fields-list"  
      data-prototype="{{ form_widget(form.vars.prototype)|e }}"  
      data-counter="{{ form|length }}">  
     {% for collection in form %}  
            {{ form_widget(collection) }}  
     {% endfor %}  
</ul>  
  
 {# data-target indicates the container id where add the new widget #}
 <button data-target="#collection-fields-list" id="add-collection-widget" type="button">Add</button>  
{% endblock %}  
  
{% block _example_collection_entry_widget %}  
{# A widget in the loop #}
 <div id="{{id}}">  
  {{form_row(form.answer)}} 
 {# 
    data-target indicates the widget id to remove
    don't forget the class for the remove button
  #}
  <button type="button" data-target="{{id}}" class="remove-collection-widget"> Remove</button>  
 </div>
{% endblock %}
```
*PR and constructive criticism are welcome :)*
