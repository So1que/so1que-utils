# @so1que/release

## Установка

npm: 

```bash
npm install @callcenter/release --save-dev
```  

pnpm:

```bash
pnpm install @callcenter/release --save-dev
```  

### Использование

Необходимо создать в вашем проекте `.releaserc` с `repoUrl`, например:

```json
{
    "repoUrl": "https://ci.unitedline.net/callcenter/frontend-docs-and-utils/-/tree/master/"
}
``` 

Это необходимо для того, чтобы корректно генерировать ссылки проекта в чейнжлогах (для того же слака например), master или другая ветка - это та ветка, где будет работать CI по генерации релиза

#### Команды

1) `--create-release` - создание релиза, парсятся чейнжлоги, генерируется новая версия пакета, удаляются чейнжлоги задач
2) `--create-task-changelog` - создание чейнжлога
3) `--create-pre-release` - генерация тестовой версии пакета, новая версия пакета создается на основе парсинга чейнжлогов + timestamp
4) `--create-archive` - создается архив пакета, в основном для локального тестирования в другом проекте
5) `--send-publish-updates` - отправка обновлений в наш Voiso слак канал. Берет последнюю версию пакета и его описания из чейнжлогов
6) ` --validate-changelog` - базовая валидация чейнжлогов. Принимает два параметра, название ветки и список labels вашего MR. Например, `pnpm validate-changelogs "$CI_COMMIT_REF_NAME" "$CI_MERGE_REQUEST_LABELS"`. Скрипт парсит название ветки, достает номер задачи и сверяет с названием чейнжлогов. В MR labels может быть label WITHOUT CHANGELOGS, если он будет, то валидация скипается 
7) `--delete-archives` - удаление архивов с расширением `tgz` 
8) `--skip-build` - использовать с `--create-archive`, при необходимости скипает билд, подходит для пакетов которым не нужна сборка асетов
9) `PACKAGE_NAME` - env которая нужна, если вы работаете в репозитории с несколькими пакетами/деплоями сразу. Хранить пакеты в директории `packages/*`, указываете название папки пакета в `PACKAGE_NAME`, например: `PACKAGE_NAME=release release --create-task-changelog`

#### Пример использования 

Создание команд в `package.json`  

```json
{
    "scripts": {
        "release:create-task-changelog": "PACKAGE_NAME=release release --create-task-changelog",
        "create-release": "release --create-release",
        "create-pre-release": "release --create-pre-release",
        "create-archive": "release --create-archive --skip-build",
        "send-publish-updates": "release --send-publish-updates",
        "validate-changelog": "release --validate-changelog",
        "delete-archives": "release --delete-archives",
        "pnpm:devPreinstall": "node scripts/preInstall.js",
        "prettier": "prettier -w scripts && prettier -w packages",
        "validate-changelogs": "node scripts/validateChangelogs.js",
        "create-releases": "node scripts/createReleases.js",
        "publish-updates": "node scripts/publishUpdates.js",
        "create-pre-releases": "node scripts/createPreReleases.js"
    }
}
```

