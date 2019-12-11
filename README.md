# 🌟 DataFormsJS Playground

**Thanks for visiting!** 🌠👍

This repository contains playground website for DataFormsJS. The UI (User Interface) exists on the main website in the main Website repository, while this repository only contains code that exists on the separate playground web server.

* __Playground UI__: [https://www.dataformsjs.com/en/playground](https://www.dataformsjs.com/en/playground)
* __Playground Server__: [https://playground.dataformsjs.com/](https://playground.dataformsjs.com/)

## :desktop_computer: Running Locally

Download this repository then run the install script. This will also generate a new `app_data/.env` file which is used for authentication.

~~~
cd {root-directory}
php ./scripts/install.php
~~~

Or to install using Composer: `composer require fastsitephp/fastsitephp`. Then copy `app_data/.env.example` to `app_data/.env`.

## ⚙️ How it works

This project has the same code base and a similar setup as the playground for FastSitePHP. See info in the following repository for how the site works.

The primary difference the DataFormsJS playground only allows for static assets (HTML, CSS, JavaScript, etc) and does not allow Server-Side PHP code to be defined from an end user.

[https://github.com/fastsitephp/playground](https://github.com/fastsitephp/playground)


## 🤝 Contributing

* If you find a typo or grammar error please fix and submit.
* Additional language template translations are needed. Refer to the main project if you can help with translations.
* Any changes to the core code will likely not be accepted unless you first open an issue. A lot of security is needed in order to make this site work so every line of code must be carefully considered.
* If you think you’ve found an issue with security or have additional security ideas please open an issue. No financial transactions other than the cost of the server are dependent on this site so opening a public issue is ok. However if you are able to obtain root or sudo access to the server please [get in touch privately](https://www.fastsitephp.com/en/security-issue).

## :memo: License

This project is licensed under the **MIT License** - see the [LICENSE](LICENSE) file for details.
