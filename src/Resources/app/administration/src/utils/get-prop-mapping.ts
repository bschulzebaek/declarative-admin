/**
 * For compatibility with existing code. Refactoring is required in those cases
 *
 * Approaches could include:
 * - generally, minimize use of props and stores for simple UI/UX components!
 * - make use of window events (for example, "CustomerDetailPageLoadedEvent") to replace props and stores
 * - implement standardized stores per module
 */
export default function getPropMapping(routeName: string, component: VueComponent) {
    const config = Shopware.Declarative.getViewDefinitionByRouteName(routeName);
    let boundProps = {};

    if (!config.propsMapping) {
        return boundProps;
    }

    Object.entries(config.propsMapping).forEach(([local, target]) => {
        boundProps[target ] = component[local];
    });

    return boundProps;
}
