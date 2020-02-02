# :star2: DataFormsJS Playground

**Thanks for visiting!** 🌠👍

* __Playground UI__: https://www.dataformsjs.com/en/playground
* __Playground Server__: https://playground.dataformsjs.com

<table>
  <tbody>
    <tr>
      <td><strong>en - English</strong><br> This repository contains playground website for DataFormsJS. The UI (User Interface) exists on the main website in the main Website repository, while this repository only contains code that exists on the separate Code Playground web server.</td>
    </tr>
    <tr>
      <td lang="es"><strong>es - Español</strong><br> Este repositorio contiene un sitio web de juegos para DataFormsJS. La interfaz de usuario (UI) existe en el sitio web principal en el repositorio principal del sitio web, mientras que este repositorio solo contiene código que existe en el servidor web del patio de juegos separado.</td>
    </tr>
    <tr>
      <td lang="pt-BR"><strong>pt-BR - Português (do Brasil)</strong><br> Este repositório contém o site do Code Playground para o DataFormsJS. A UI (Interface do usuário) existe no website principal do repositório Website principal, enquanto este repositório contém apenas código existente no servidor web do Code Playground separado.</td>
    </tr>
    <tr>
      <td lang="ja"><strong>ja - 日本語</strong><br> このリポジトリには、DataFormsJSのプレイグラウンドWebサイトが含まれています。 UI（ユーザーインターフェイス）はメインWebサイトリポジトリのメインWebサイトに存在しますが、このリポジトリには、別個のプレイグラウンドWebサーバーに存在するコードのみが含まれます。</td>
    </tr>
    <!--
    <tr>
      <td lang="{iso}"><strong>{iso} - {lang}</strong><br> {content}</td>
    </tr>
    -->
  </tbody>
</table>

## :desktop_computer: Running Locally

Download this repository then run the install script. This will also generate a new `app_data/.env` file which is used for authentication.

~~~
cd {root-directory}
php ./scripts/install.php
~~~

Or to install using Composer: `composer require fastsitephp/fastsitephp`. Then copy `app_data/.env.example` to `app_data/.env`.

Then follow instructions in the root `index.php` page to run the site. You will also need to point the UI from the local build of the main site to the local playground server. Search for “urlRoot:” in the `website\public\js\page-playground.js` file and make the change.

https://github.com/dataformsjs/website/blob/master/public/js/page-playground.js

## :gear: How it works

This project has the same code base and a similar setup as the playground for FastSitePHP. See info in the following repository for how the site works.

The primary difference the DataFormsJS playground only allows for static assets (HTML, CSS, JavaScript, etc) and does not allow Server-Side PHP code to be defined from an end user. The version for FastSitePHP has a more complex setup because it requires a custom build of PHP.

https://github.com/fastsitephp/playground


## :handshake: Contributing

* If you find a typo or grammar error please fix and submit.
* Additional language template translations are needed. Refer to the main project if you can help with translations.
* Any changes to the core code will likely not be accepted unless you first open an issue. A lot of security is needed in order to make this site work so every line of code must be carefully considered.
* If you think you’ve found an issue with security or have additional security ideas please open an issue. No financial transactions other than the cost of the server are dependent on this site so opening a public issue is ok. However if you are able to obtain root or sudo access to the server please [get in touch privately](https://www.fastsitephp.com/en/security-issue).

## :memo: License

This project is licensed under the **MIT License** - see the [LICENSE](LICENSE) file for details.
