const TYPING_SPEED_IN_MILLISECONDS = 150;
const WAIT_AFTER_TYPED_EFFECT_IN_MILLISECONDS = 2000;

/**
 * Timeout with callback function to wait for a certain amount of time before executing the callback function.
 * @param {*} handler to be executed after the timeout
 * @param {*} timeout in milliseconds
 * @returns promise that resolves after the timeout
 */
const timeoutWithCallback = (handler, timeout) => new Promise((resolves) => setTimeout(handler ? handler : resolves, timeout));

/**
 * Get the length of the inner html of an element.
 * @param {*} element to get the length of the inner html of the element
 * @returns the length of the inner html of the element
 */
const getElementInnerHtmlLength = (element) => element.innerHTML.length;

/**
 * Function for add the text to an element tag.
 * The text is added one character at a time.
 * The text is added to the inner html of the element.
 * @param {*} element to add the text to the inner html of the element tag
 * @param {*} text to add to the inner html of the element tag
 */
async function addTextToElementTag(element, text) {
    let elementInnerHtmlLength = getElementInnerHtmlLength(element);
    const textLength = text.length;
    while (elementInnerHtmlLength !== textLength) {
        element.innerHTML += text.charAt(elementInnerHtmlLength);
        elementInnerHtmlLength = getElementInnerHtmlLength(element);
        await timeoutWithCallback(typingEffect, TYPING_SPEED_IN_MILLISECONDS);
    }
    await timeoutWithCallback(null, WAIT_AFTER_TYPED_EFFECT_IN_MILLISECONDS);
}

/**
 * Function for remove the text from an element tag.
 * The text is removed one character at a time.
 * The text is removed from the inner html of the element.
 * @param {*} element to remove the text from the inner html of the element tag
 */
async function removeTextFromElementTag(element) {
    let elementInnerHtmlLength = getElementInnerHtmlLength(element);
    while (elementInnerHtmlLength) {
        element.innerHTML = element.innerHTML.substring(0, element.innerHTML.length - 1)
        elementInnerHtmlLength = getElementInnerHtmlLength(element);
        await timeoutWithCallback(null, TYPING_SPEED_IN_MILLISECONDS);
    }
    await timeoutWithCallback(null, WAIT_AFTER_TYPED_EFFECT_IN_MILLISECONDS);
}

/**
 * function to execute the typing effect on the element tag with the given text.
 */
async function typingEffect() {
    const text = 'Full-Stack Developer';
    const [h3] = document.getElementsByTagName("h3");
    await addTextToElementTag(h3, text);
    await removeTextFromElementTag(h3);
    typingEffect();
}

/**
 * Add the event listener to the DOMContentLoaded for the document.
 * @param {*} event to be added
 * @param {*} handler to be executed after the event
 */
document.addEventListener("DOMContentLoaded", typingEffect);
