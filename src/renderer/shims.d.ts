declare module '*.vue' {
    // eslint-disable-next-line
    import { defineComponent } from 'vue';
    const c = defineComponent<any>();
    export default c;
}

