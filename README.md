# todov1

This template should help get you started developing with Vue 3 in Vite.

# Current Issues
- Add responsiveness.
- Make sure that when switching from all tasks -> in progress -> complete the nav item stays highlighted depending on what view you're on.
- There is a bug where if you add tasks on views other than 'All tasks' the indexing (task.id) gets messed up, if you create a task on 'complete' and then go back to 'all tasks' and attempt to change its status, it will change the status of the very first task created instead. I'm assuming its an issue with the task counter for each view not being synced, actually as i'm writing this I probably just need to store the task counter to localStorage along with the array itself... 
- Font import issues on windows machine.

## Recommended IDE Setup

[VSCode](https://code.visualstudio.com/) + [Volar](https://marketplace.visualstudio.com/items?itemName=Vue.volar) (and disable Vetur).

## Customize configuration

See [Vite Configuration Reference](https://vitejs.dev/config/).

## Project Setup

```sh
npm install
```

### Compile and Hot-Reload for Development

```sh
npm run dev
```

### Compile and Minify for Production

```sh
npm run build
```
