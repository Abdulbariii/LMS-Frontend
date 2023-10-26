/**
 * @typedef {object} Page - The page object.
 * @property {React.ComponentType} Component - The page component.
 * @property {Promise<Function>} loader - The loader function that imports the page module.
 */

/**
 * Asynchronously builds a lazy-loaded page.
 *
 * @param {Promise<Function>} module - The module function that imports the page module.
 * @returns {() => Promise<Page>} - A promise that resolves to a function that returns the page component and loader.
 *
 * @example
 * // Asynchronously build a lazy-loaded page for the index route
 * const indexPage = await lazyPageBuilder(() => import("@/pages/routes/_index"));
 *
 * // Invoke the returned function to get the page component and loader
 * const { Component, loader } = indexPage();
 */
export const lazyPageBuilder = (module) => async () => {
  const { default: Page, loader, action } = await module();
  return { Component: Page, loader, action };
};
