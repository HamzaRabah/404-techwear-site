// products.js
const products = [
    {
        id: "no-problem-protocol",
        name: "No Problem Protocol",
        description: "Celebrating those unexpected offline moments, this design takes a common internet error and turns it into a calm, cool statement, where no internet means no problem!",
        price: 19.99,
        images: [
            {
                src: "assets/images/no-internet-zoom-view.webp",
                alt: "t-shirt zoom view"
            },
            // {
            //     src: "assets/images/no-internet-tshirt-view.webp",
            //     alt: "t-shirt view"
            // }
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
            // {
            //     src: "assets/images/chatgpt-tshirt-view.webp",
            //     alt: "t-shirt view"
            // }
        ],
        colors: ["Off-White"],
        defaultColor: "Off-White",
        sizes: ["M", "L", "XL"],
        status: "available"
    },
    {
        id: "works-locally",
        name: "Works Locally",
        description: "If it works here, it’s not my fault it breaks there. A badge of every dev’s quiet truth: one environment’s success is another’s headache.",
        price: 19.99,
        images: [
            {
                src: "assets/images/works-locally-zoom-view.webp",
                alt: "t-shirt zoom view"
            },
            // {
            //     src: "assets/images/works-locally-tshirt-view.webp",
            //     alt: "t-shirt view"
            // }
        ],
        colors: ["Off-White"],
        defaultColor: "Off-White",
        sizes: ["M", "L", "XL"],
        status: "available"
    }
];