export interface PluginModule {
    activate: () => void
    deactivate: () => void
}