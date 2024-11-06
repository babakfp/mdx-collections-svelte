import {
    getCollectionEntries,
    useCollections,
    useTypedCollections,
    z,
    type ImportGlobMarkdownMap,
} from "../src"

const pages = {
    "/src/content/posts/hello-world.md": {
        default: undefined as any,
        mdx: {
            frontmatter: {
                title: "Hello, World!",
            },
        },
        frontmatter: {
            title: "Hello, World!",
        },
    },
    "/src/content/products/hello-world.md": {
        default: undefined as any,
        mdx: {
            frontmatter: {
                title: "Hello, World!",
            },
        },
        frontmatter: {
            title: "Hello, World!",
        },
    },
} satisfies ImportGlobMarkdownMap

const postEntries = getCollectionEntries(
    pages,
    "posts",
    z.object({
        title: z.string(),
    }),
)

const productsEntries = getCollectionEntries(
    pages,
    "products",
    z.object({
        title: z.string(),
        price: z.number(),
    }),
)

console.log(postEntries[0].frontmatter)
console.log(productsEntries[0].frontmatter)

// ---

const collections = useCollections(pages)

const postEntries2 = collections.getEntries(
    "posts",
    z.object({
        title: z.string(),
    }),
)

const productsEntries2 = collections.getEntries(
    "products",
    z.object({
        title: z.string(),
        price: z.number(),
    }),
)

console.log(postEntries2[0].frontmatter)
console.log(productsEntries2[0].frontmatter)

// ---

const collections2 = useTypedCollections(pages, {
    posts: z.object({
        title: z.string(),
    }),
    products: z.object({
        title: z.string(),
        price: z.number(),
    }),
})

const postEntries3 = collections2.getEntries("posts")
const productsEntries3 = collections2.getEntries("products")

console.log(postEntries3[0].frontmatter)
console.log(productsEntries3[0].frontmatter)
