[rollup-plugin-sri](../README.md) › [PluginOptions](pluginoptions.md)

# Interface: PluginOptions

## Hierarchy

* **PluginOptions**

## Index

### Properties

* [active](pluginoptions.md#optional-active)
* [algorithms](pluginoptions.md#optional-algorithms)
* [crossorigin](pluginoptions.md#optional-crossorigin)
* [selectors](pluginoptions.md#optional-selectors)

## Properties

### `Optional` active

• **active**? : *undefined | false | true*

*Defined in [index.ts:41](https://github.com/JonasKruckenberg/rollup-plugin-sri/blob/b7f6a80/index.ts#L41)*

Can be used to disable the plugin, for example when used together with hot-module-reloading.

**`default`** true

___

### `Optional` algorithms

• **algorithms**? : *string[]*

*Defined in [index.ts:27](https://github.com/JonasKruckenberg/rollup-plugin-sri/blob/b7f6a80/index.ts#L27)*

A list of hashing algorithms to use when computing the integrity attribute.
The hashing algorithm has to be supported by the nodejs version you're running on.
Standard hash functions are: `sha256`, `sha384` and `sha512`.
> NOTE: While browser vendors are free to support more algorithms than those stated above,
> they generally do not accept `sha1` and `md5` hashes.

**`default`** ["sha384"]

___

### `Optional` crossorigin

• **crossorigin**? : *"anonymous" | "use-credentials"*

*Defined in [index.ts:35](https://github.com/JonasKruckenberg/rollup-plugin-sri/blob/b7f6a80/index.ts#L35)*

You can also specify the value for the crossorigin attribute.
This attribute has to be set to prevent cross-origin data leakage.
The default value `anonymous` should be okay for normal use.
see: [the W3C spec](https://www.w3.org/TR/SRI/#cross-origin-data-leakage) for details.

**`default`** "anonymous"

___

### `Optional` selectors

• **selectors**? : *string[]*

*Defined in [index.ts:18](https://github.com/JonasKruckenberg/rollup-plugin-sri/blob/b7f6a80/index.ts#L18)*

A list of strings you can provide that the plugin will use to match.
it will then try to compute an integrity attribute for the matched tag.
Currently it only matches script tags and link with rel=stylesheet as per specification.
see [the W3C spec](https://www.w3.org/TR/SRI/#elements) for more information.
The selector syntax is the same as jQuery's.

**`default`** ["script","link[rel=stylesheet]"]