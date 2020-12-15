/**
 * Custom JS
 */

function navbar() {
    return {
        showMobileMenu: false,
        toggleMobileMenu: function () {
            this.showMobileMenu = !this.showMobileMenu
            return
        },
    }
}
