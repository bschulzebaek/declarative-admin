# Declarative Admin

This is a proof-of-concept implementation for declaratively creating admin modules in Shopware 6.
The goal is to provide a simple interface using config files to define the module structure (routing, views) and content without writing any Vue/JS code, thus standardizing UI implementations and reducing complexity & instability by minimizing boilerplate and different implementations of the same behaviors.

## Registering a Module
To register a new admin module, you need to create a YAML file in the `./module-definitions` directory.<br> 
Files following the `<name>.module.yaml` naming pattern are autoloaded (still requires a `composer build:js:admin` or restarting the watcher).

The configuration defines essential properties such as:
- Module description and representation
- Route definitions
- Page structure and content
- Entities & associations

Here's an example of a basic module configuration:

```yaml
# yaml-language-server: $schema=./definition.schema.json
id: test-example
title: Example Module
navigation:
    - id: test-example
      label: Example
      path: test.example.index
      icon: regular-lightbulb
pages:
    - name: index
      slots:
          content:
              component: declarative-card-placeholder
              title: Hello, World!
```

The route to access a page is constructed from the module ID and the page name, in this example resulting in `/test/example/index`.

## Working with Entities
Since modules are usually built around specific entities, there is some built-in standardized data handling.
To enable it, you need to specify the `entity` property in your module definition.

```yaml
id: test-example
title: Example Module
entity: example # The name defined in your entity definition file
navigation:
    ...
```

In addition to that, your routes should follow a specific naming convention to satisfy internal checks for determining the correct behavior based on the current page.
These page names are: `list`, `create` and `detail`.

```yaml
id: test-customer
title: Customer
entity: customer
...
pages:
    - name: list
    - name: create
    - name: detail
```

### Associations
When working with associations, for example, to display a list of addresses for a customer, you can define the association to be loaded per page.

```yaml
id: test-customer
title: Customer
entity: customer
pages:
    - name: list
      associations: [defaultBillingAddress]
      slots:
          content: 
              component: declarative-content-list
              columns: 
                  - email
                  - defaultBillingAddress.street
                  - defaultBillingAddress.zipcode
                  - defaultBillingAddress.city
```

## Module Namespaces

Module namespaces consist of multiple parts separated by a dot: `<vendor>.<module>.<page>.<tab>`.<br>
The same structure is used for route names, though the parts a sperated by a slash: `<vendor>/<module>/<page>/<tab>`.<br>

```yaml
id: <vendor>-<module>
pages:
    - name: <page>
      tabs:
            <tab>:
                ...
```

**Vendor**: Used to avoid conflicts with other developers/extensions. Ideally, it should be the same as the vendor name in your composer.json/manifest.xml file.<br>
**Module**: Used to group multiple pages into a feature, usually representing an entity and its associations.<br>
**Page**: Used to register the actual page of a route.<br>
**Tab**: Used to register the tabs of a page.<br>

For example, the customer module structure could be described as follows:

```
sw.customer 
sw.customer.list
sw.customer.create
sw.customer.create.base
sw.customer.detail
sw.customer.detail.base
sw.customer.detail.addresses
sw.customer.detail.order
|  |        |      | 
|  |        |      Tab identifier 
|  |        Page identifier 
|  Module identifier 
Vendor prefix
```

## Pages

### Mixin, Store
All pages are based on a single [generic page component](src/Resources/app/administration/src/component/page/sw-page-declarative.vue) built around a mixin and store that provide common behaviors for entity pages.<br>
The same mixin and store are available for all nested components and can be used to implement UI behaviors. Typical examples are:

- reloading content when the content language changes
- providing an edit mode for detail pages
- reacting to loading states
- redirects inside a module

### Page Slots 
Pages support a slot interface, which directly maps to the slots provided by `sw-page`. These are used as building blocks for the page structure.<br>
These slots accept a component name or an object consisting of the name and props to be passed to the component.

```yaml

pages:
    - name: list
      slots:
          header: declarative-header-list
          languageSwitch: declarative-language-switch
          content:
              component: declarative-content-list
              columns: [firstName, lastName, email]
```

### Page Content
Page content can be defined in 2 ways:
- Using the `content` slot, which directly translates to the `sw-page` content slot.
- Using "tabs" which allows for more complex structures.

A page can have multiple tabs, each with its own content structure. Tabs can either be a component on their own or have a list of "cards".

```yaml
pages:
    - name: detail
      tabs:
          base:
              cards:
                  - component: declarative-card-entity-form
                    fields: [firstName, lastName, email]
          orders:
              component: customer-order-list
```

Basically any component can be re-used here, as long as certain requirements are met:
- All required props are available in the generic page (including the mixin and store)
- The component itself handles all required external data

Props can be passed to any content or tab component using the `props` key, which essentially is mapping properties of the generic page to the target prop names.

This includes all properties of the generic mixin and store.


```yaml
pages:
    - name: detail
      tabs:
          orders:
              component: customer-order-list
              props:
                  customer: store.currentItem
```
