// products.js
const products = [
    {
        id: "no-problem-protocol",
        name: "No Problem Protocol",
        description: "Celebrating those unexpected offline moments, this design takes a common internet error and turns it into a calm, cool statement, where no internet means no problem!",
        price: 19.99,
        images: [
            {
                src: "assets/images/no-internet-store-view.webp",
                alt: "t-shirt store view"
            },
            {
                src: "assets/images/no-internet-tshirt-view.webp",
                alt: "t-shirt view"
            },
            {
                src: "assets/images/no-internet-zoom-view.webp",
                alt: "t-shirt zoom view"
            }
        ],
        colors: ["Off-White"],
        defaultColor: "Off-White",
        sizes: ["M", "L", "XL"],
        status: "available" // available or coming-soon
    },
    {
        id: "new-default",
        name: "New Default",
        description: "When search engines became fallback tools, and ChatGPT became your first stop. A subtle nod to how we code, learn, and think today.",
        price: 19.99,
        images: [
            {
                src: "assets/images/chatgpt-zoom-view.webp",
                alt: "t-shirt zoom view"
            },
            {
                src: "assets/images/chatgpt-tshirt-view.webp",
                alt: "t-shirt view"
            }
        ],
        colors: ["Off-White"],
        defaultColor: "Off-White",
        sizes: ["M", "L", "XL"],
        status: "available"
    },
    {
        id: "git-commit",
        name: "git commit -m \"Style Update\"",
        description: "For when you're committed to looking good while coding.",
        price: 19.99,
        images: [
            {
                src: "assets/images/404_Logo-Black.webp",
                alt: "git commit t-shirt front view"
            }
        ],
        colors: ["Black", "Gray", "Off-White"],
        defaultColor: "Off-White",
        sizes: ["M", "L", "XL"],
        status: "coming-soon"
    }
];