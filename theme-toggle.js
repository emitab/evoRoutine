// Theme Toggle Functionality
App.toggleTheme = async function () {
    if (!App.user) return;

    const newTheme = App.user.settings.theme === 'dark' ? 'light' : 'dark';
    App.user.settings.theme = newTheme;

    await Store.saveUser(App.user);
    UI.renderApp();
};
