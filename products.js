// products.js
const products = [
    {
        id: "no-problem-protocol",
        name: "No Problem Protocol",
        description: "Celebrating those unexpected offline moments, this design takes a common internet error and turns it into a calm, cool statement, where no internet means no problem!",
        price: 29.99,
        images: [
            {
                src: "assets/images/no-internet-store-view.webp",
                alt: "Have you tried turning it off and on again? t-shirt front view"
            },
            {
                src: "assets/images/no-internet-store-view.webp",
                alt: "Have you tried turning it off and on again? t-shirt back view"
            },
            {
                src: "assets/images/no-internet-store-view.webp",
                alt: "Have you tried turning it off and on again? t-shirt detail view"
            }
        ],
        colors: ["Off-White"],
        defaultColor: "Off-White",
        sizes: ["M", "L", "XL"],
        status: "available" // available or coming-soon
    },
    {
        id: "console-log",
        name: "console.log(\"Hello World\")",
        description: "The developer's first line of code and most trusted debugging tool.",
        price: 29.99,
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
    },
    {
        id: "git-commit",
        name: "git commit -m \"Style Update\"",
        description: "For when you're committed to looking good while coding.",
        price: 29.99,
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