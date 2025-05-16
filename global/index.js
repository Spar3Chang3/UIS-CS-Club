export const NavLinks = [
    { name: "Home", url: "/" },
    { name: "About", url: "/about" },
    { name: "Members", url: "/members" },
    { name: "Contact", url: "/contact" }
]

export const Logos = {
    club: {
        dark: "/global/data/images/UISCSClubDark.svg",
        light: "/global/data/images/UISCSClubLight.svg",
    }
}

export function CheckColorScheme(logoObj) {
    if (window.matchMedia("(prefers-color-scheme: dark)").matches) {
        return logoObj.dark;
    } else {
        return logoObj.light;
    }
}