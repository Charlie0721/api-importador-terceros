import {App} from './app'

const main = async () => {

const app =new App(3001);
await app.listen();
}

main()