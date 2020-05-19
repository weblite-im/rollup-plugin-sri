import cheerio from 'cheerio'
import { createHash } from 'crypto'
import { OutputBundle, OutputOptions, OutputChunk, OutputAsset } from 'rollup'

interface PluginOptions {
  /**
   * A list of strings you can provide that the plugin will use to match.
   * it will then try to compute an integrity attribute for the matched tag.
   * Currently it only matches script tags and link with rel=stylesheet as per specification.
   * see [the W3C spec](https://www.w3.org/TR/SRI/#elements) for more information.
   * The selector syntax is the same as jQuery's.
   * @default ["script","link[rel=stylesheet]"]
   */
  selectors?: string[]
  /**
   * A list of hashing algorithms to use when computing the integrity attribute.
   * The hashing algorithm has to be supported by the nodejs version you're running on.
   * Standard hash functions are: `sha256`, `sha384` and `sha512`.
   * > NOTE: While browser vendors are free to support more algorithms than those stated above,
   * > they generally do not accept `sha1` and `md5` hashes.
   * @default ["sha512"]
   */
  hashes?: string[]
  /**
   * You can also specify the value for the crossorigin attribute.
   * This attribute has to be set to prevent cross-origin data leakage.
   * The default value `anonymous` should be okay for normal use.
   * see: [the W3C spec](https://www.w3.org/TR/SRI/#cross-origin-data-leakage) for details.
   * @default "anonymous"
   */
  crossorigin?: 'anonymous' | 'use-credentials'
}

export default (options?: PluginOptions) => {
  const selectors = options?.selectors || ['script', 'link[rel=stylesheet]']
  const hashAlgorithms = options?.hashes || ['sha512']
  const crossorigin = options?.crossorigin || 'anonymous'

  return {
    name: 'rollup-plugin-sri',
    generateBundle(options: OutputOptions, bundle: OutputBundle) {
      for (let chunk of Object.values(bundle)) {
        chunk = chunk as OutputAsset
        if (chunk.fileName.endsWith('html')) {
          const $ = cheerio.load(chunk.source.toString())
          $(selectors.join()).each((index, el) => {
            const id = el.attribs.href || el.attribs.src
            if (!id) return
            // @ts-ignore for now because code is not in type asset and source is not in type chunks
            const source = bundle[id].code || bundle[id].source
            if (!source) {
              return this.warn(`${source} was referenced in html file but not in rollup bundle`)
            }
            const hashes = hashAlgorithms.map((algorithm) => generateIdentity(source, algorithm))
            el.attribs.integrity = hashes.join(' ')
            el.attribs.crossorigin = crossorigin
          })
          chunk.source = $.html()
        }
      }
    }
  }
}

function generateIdentity(source: string, alg: string) {
  const hash = createHash(alg).update(source).digest().toString('base64')
  return `${alg}-${hash}`
}
