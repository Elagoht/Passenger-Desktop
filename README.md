<div align="center">
<img src="https://raw.githubusercontent.com/Elagoht/Passenger-Landing/main/public/assets/logo.png" width="192" height="192" />

# Passenger Desktop

[![Codacy Badge](https://app.codacy.com/project/badge/Grade/b948d943dd8f4de987e1fa3e03a035f4)](https://app.codacy.com/gh/Elagoht/Passenger-UI/dashboard?utm_source=gh&utm_medium=referral&utm_content=&utm_campaign=Badge_grade)
![Passenger](https://img.shields.io/badge/Core_Version-0.3.0_beta.1-F2970D)
![React.js](https://img.shields.io/badge/React.js-UI-61DAFB?logo=react)
![Tailwind CSS](https://img.shields.io/badge/Tailwind-CSS-06B6D4?logo=tailwind)
![Tauri](https://img.shields.io/badge/Tauri-Desktop-24C8D8?logo=tauri)
![GitHub Repo stars](https://img.shields.io/github/stars/Elagoht/Passenger-UI?style=flat)
![GitHub Issues](https://img.shields.io/github/issues/Elagoht/Passenger-UI)
![GitHub Pull Requests](https://img.shields.io/github/issues-pr/Elagoht/Passenger-UI)
![GitHub License](https://img.shields.io/github/license/Elagoht/Passenger-UI)
</div>

The Passenger User Interface represents a contemporary and feature-rich frontend tailored for the Passenger Passphrase Manager. It is meticulously crafted to seamlessly integrate with the Passenger CLI, offering comprehensive functionalities. This client facilitates passphrase ban-list management, statistical analysis, keychain security enhancements, user guidance, and more.

## Technologies and Libraries

- Leveraging the Vite + React + Tauri stack to initialize the project.
- Utilization of Typescript ensures type safety, replacing plain JavaScript for uniformity and robustness.
- Navigation facilitated through React Router DOM.
- Form management streamlined with Formik and Yup.
- Engage users with animations provided by Formkit Autoanimate and Framer Motion.
- Tabler Icon Set enhances visual elements.
- Zustand employed for efficient state management.
- Classnames utilized for dynamic class assignments.
- Swiper enables seamless slideshow presentations.
- Interaction with CLI application facilitated through the Tauri API.

##  Running the Project

You MUST have the Passenger CLI on the `src-tauri` directory to run the project. The CLI is not included in this repository, but you can build from the source code or download the latest release from the [Passenger CLI repository](https://github.com/Elagoht/Passenger-CLI).

###  Requirements

- Node.js
- Rust
- Cargo
- NPM

### Starting the Project

1. Clone the repository to your local machine.
2. Navigate to the project directory.
3. Install the dependencies by running `npm install`.
4. Start the development server with `npm run taui dev`. This will start a compilation process and open the Tauri window.

## License

This project is licensed under the terms of the GNU General Public License v3.0. For more details, please refer to the [LICENSE](LICENSE) file.
