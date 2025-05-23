# Declarative Admin

This is a proof-of-concept implementation for declaratively creating admin modules in Shopware 6.
The goal is to provide a simple interface using config files to define the module structure (routing, views) and behavior without writing any Vue/JS code, thus standardizing UI implementations and reducing complexity & instability by minimizing LOC.

This project is used to identify edge cases, limitations and risks for such an approach.


## Registering a Module
Lorem ipsum dolor sit amet, consectetur adipiscing elit.

```yaml
id: 'declarative-promotion'
name: 'promotion-v3'
title: 'Promotions'
entity: 'promotion'
routes:
    list:
        name: list
        columns:
            - name
            - active
            - validFrom
            - validUntil
navigation:
    - id: 'declarative-promotion'
      path: 'declarative.promotion.list'
      label: 'Promotions (D)'
      color: '#FFD700'
      icon: 'regular-sparkles'
      position: 200
      parent: 'sw-marketing'
      privilege: 'promotion.viewer'

```

## Module Namespaces

Module namespaces consist of multiple parts separated by a dot: `<vendor>.<module>.<page>.<view>`.

**Vendor**: Used to avoid conflicts with other developers/extensions. Ideally, it should be the same as the vendor name in your composer.json/manifest.xml file.<br>
**Module**: Used to group multiple pages into a feature, usually representing an entity and its associations.<br>
**Page**: Used to register the actual page of a route.<br>
**View**: Used to register the nested views of a page.<br>

For example, the base view of the customer module structure could be described as follows:

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
|  |        |      View identifier 
|  |        Page identifier 
|  Module identifier 
Vendor prefix
```

### Naming Rules

| Part     | Description | Reserved Names       | 
|----------|--------------------------|---------------------------|
| `vendor` | Must be a unique to the developer/company.|                           |
| `module` | Must be unique within the vendor namespace.|                           |
| `page`   | Must be unique within the module.| `list` `detail` `create` |
| `view`   | Must be unique within the page.|                           |

Note: The reserved page names are used to register pre-defined pages in the module. Using these is possible, but they come with their own defaults and behavior; custom configuration may be overridden.

### Module UI Deep Dive

Explore common use cases that require configuration or represent edge cases.

Could do: Write-up per page type and list differences by module

## Risks
* Too many edge cases in one place → stability, testability
* Compatibility
 
## Limitations
* Extensibility (Twig vs. Extension SDK)
* Design will be more standardized across all modules
