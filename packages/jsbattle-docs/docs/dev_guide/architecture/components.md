# Components

## Overview
![comp overview](../../img/puml/comp_overview.png)

### Frontend
The frontend consists of two separated apps: public-facing **webpage** and back-office **admin**.

#### Webpage
The **Webpage** is a public-facing frontend app based on ReactJS. To make integration with **JsBattleEngine** it is wrapped by a React component (**JsBattle ReactComp**). The **Webpage** also contains static documentation (**JsBattle Docs**) generated automatically from markdown files in `jsbattle-docs` package. The frontend communicates with backed via **HTTP** and **WebServices**.

#### Admin
The **Admin** is a back-office app based on ReactJS. It communicates with backed via **HTTP** and **WebServices**. Access to **Admin** require proper permissions (e.g. `admin` role)

### Backend
Backend consists of single **JsBattle Server** app and optional pool of **JsBattle Workers**. Workers and Server can run on multiple nodes allowing horizontal scaling.

#### Server
**JsBattle Server** is base on [Moleculer](https://moleculer.services/) framework. The API and static HTML content is exposed by [ExpressJS](https://expressjs.com/).The static content of the **Webpage** is hosted ad `/*`, and **Admin** is available at `/admin/*`. The API is available via **ApiGateway** Service. The service receives all API calls and route them to proper micro services. The API is split into three areas:

 - `/api/*` - public API
 - `/api/user/*` - features available for authenticated users
 - `/api/admin/*` - features available for authenticated admins

The authentication is handled by [PassportJs](http://www.passportjs.org/) and it requires connection to third-party OAuth (e.g. Github, Google, etc...). Following URLs are used to handle the authentication:
 - `/auth/{provider-name}` - starts auth process
 - `/auth/{provider-name}/callback` - OAuth callback URL
 - `/auth/logout` - close the session

#### Worker
The [Moleculer](https://moleculer.services/) has a built-in mechanism that allows spreading services across multiple nodes. If JsBattle runs in **Worker** mode, it starts a node that hosts all scaleable services and connects to other nodes. See [configuration](../../../configuration.md) and [Moleculer](https://moleculer.services/) docs for more details.

## Moleculer Microservices

Following diagram shows structure of all micro services and dependencies between them.

![comp overview](../../img/puml/comp_microservices.png)
