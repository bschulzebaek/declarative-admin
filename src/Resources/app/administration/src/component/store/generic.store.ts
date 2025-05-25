const store = Shopware.Store.register({
    id: 'generic-store',
    state: () => ({
        isLoading: true,
        editMode: false,
        items: [],
        term: '',
        listTotal: 0,
        currentItem: null,
    }),
});

export default store;
