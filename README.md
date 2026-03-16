# **My Link Hub 🔗**

A dynamic, personalized link-in-bio page builder designed to help you consolidate all your important online links into a single, elegant, and shareable profile. Easily create, customize, and share your digital presence with a unique QR code and a concise URL, making it effortless for your audience to connect with you across platforms.

## Installation

To get My Link Hub up and running on your local machine, follow these simple steps:

1.  **Clone the Repository**

    ```bash
    git clone https://github.com/Emafido/links.git
    cd links
    ```

2.  **Install Dependencies**
    Using npm:

    ```bash
    npm install
    ```

    Or with yarn:

    ```bash
    yarn install
    ```

3.  **Run the Development Server**

    ```bash
    npm run dev
    ```

    Or with yarn:

    ```bash
    yarn dev
    ```

    Open [http://localhost:3000](http://localhost:3000) in your browser to see the application.

## Usage

My Link Hub provides an intuitive interface to build and manage your personal link page.

1.  **Build Your Profile**: Upon opening the application, you'll be presented with an editor page. Start by filling in your desired name and a short bio or headline in the provided input fields.
2.  **Add Your Links**:
    *   Click the "Add Another Link" button to create a new link entry.
    *   For each link, enter a descriptive title (e.g., "GitHub Profile", "My Website") and the full URL (e.g., `https://github.com/yourusername`).
    *   The application automatically attempts to display a relevant icon based on the URL (e.g., GitHub, Twitter, LinkedIn).
    *   You can add as many links as you need.
3.  **Manage Links**: Each link entry comes with a trash icon button. Click it to remove a link from your profile.
4.  **Generate Shareable Assets**: As you type, the application dynamically generates two key assets on the right side of the screen:
    *   **QR Code**: A unique QR code is generated in real-time. This can be scanned by others to instantly access your link hub page.
    *   **Shareable URL**: A compact URL is created. This URL encodes all your profile data, allowing you to share your hub without needing a backend database.
5.  **Share Your Hub**:
    *   Click the "Copy URL" button to copy the generated shareable URL to your clipboard.
    *   Use the "Test Live Page" button to open your personalized link hub in a new tab, allowing you to see exactly what others will experience.
    *   Share the copied URL or the QR code with your audience across social media, emails, or any other platform.

## Features

*   **Personalized Profile Creation**: Effortlessly set up your name and a concise bio to introduce yourself.
*   **Dynamic Link Management**: Easily add, update, and remove links to all your online profiles, portfolios, and content in real-time.
*   **Instant QR Code Generation**: Automatically generates a unique QR code for your link hub, enabling quick sharing in physical spaces or digital documents.
*   **Shareable URL**: Produces a compact, self-contained URL that encodes all your profile data, allowing for seamless sharing without the need for server-side storage.
*   **Responsive and Modern UI**: Built with Tailwind CSS and animated with Framer Motion, offering a sleek, user-friendly, and highly responsive experience across devices.
*   **Intelligent Icon Recognition**: Links automatically display relevant social media icons (GitHub, Twitter, LinkedIn) for enhanced visual appeal and clarity.
*   **Vercel Analytics Integration**: Integrated with Vercel Analytics to provide insights into link clicks and user engagement.

## Technologies Used

| Technology            | Description                                           |
| :-------------------- | :---------------------------------------------------- |
| **Next.js**           | The React framework for production-grade applications |
| **TypeScript**        | A strongly typed superset of JavaScript               |
| **Tailwind CSS**      | A utility-first CSS framework for rapid UI development |
| **Framer Motion**     | A production-ready motion library for React           |
| **Lucide React**      | A collection of beautiful and customizable open-source icons |
| **QR Code React**     | A React component for easy QR code generation        |
| **Vercel Analytics**  | Privacy-friendly analytics for web projects           |

## Contributing

We wholeheartedly welcome contributions to enhance My Link Hub! If you're interested in helping improve the project, please follow these guidelines:

*   **Fork the repository** to your GitHub account.
*   **Create a new branch** for your feature or bug fix: `git checkout -b feature/your-feature-name`.
*   **Make your changes** and commit them with clear, descriptive messages.
*   **Push your changes** to your new branch: `git push origin feature/your-feature-name`.
*   **Open a Pull Request** against the `main` branch of this repository. ✨

Please ensure your code adheres to the project's existing coding standards and includes appropriate documentation or tests where necessary.

## License

This project is licensed under the MIT License.

## Author Info

**Emafido**
*   LinkedIn: [https://www.linkedin.com/in/emmanuel-emafido/](https://www.linkedin.com/in/emmanuel-emafido/)
*   X (Twitter): [https://x.com/EmmanuelEmafido](https://x.com/EmmanuelEmafido)

---

![Next.js](https://img.shields.io/badge/Next.js-Black?style=for-the-badge&logo=next.js&logoColor=white)
![TypeScript](https://img.shields.io/badge/TypeScript-007ACC?style=for-the-badge&logo=typescript&logoColor=white)
![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-38B2AC?style=for-the-badge&logo=tailwind-css&logoColor=white)
![Framer Motion](https://img.shields.io/badge/Framer_Motion-black?style=for-the-badge&logo=framer&logoColor=blue)
![Vercel](https://img.shields.io/badge/Deployed%20with-Vercel-black?style=for-the-badge&logo=vercel&logoColor=white)

