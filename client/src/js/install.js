const butInstall = document.getElementById('buttonInstall');

// Logic for installing the PWA

window.addEventListener('beforeinstallprompt', (event) => {
    event.preventDefault;
    window.deferredPrompt = event;
    // sets deferredPrompt to event, which is the event that was triggered, which is the prompt, which is the install prompt, which is the deferred prompt
    butInstall.classList.toggle('hidden', false); // toggles hidden, which is the class of the button, which is the install button
});

// TODO: Implement a click event handler on the `butInstall` element
butInstall.addEventListener('click', async () => { // adds an event listener to the button, which is the install button
    console.log("butInstall clicked");
    const promptEvent = window.deferredPrompt; // sets promptEvent to deferredPrompt
    if (!promptEvent) { // if promptEvent is not defined
        return; // return nothing
    }
    const result = await promptEvent.userChoice; // sets result to userChoice, which is the user choice
    console.log('userChoice', result);
    promptEvent.prompt(); // prompts the user to install the PWA
    window.deferredPrompt = null; // sets deferredPrompt to null
    butInstall.classList.toggle('hidden', true); // toggles hidden, which is the class of the button, which is the install button
});

// TODO: Add an handler for the `appinstalled` event
window.addEventListener('appinstalled', (event) => {
    window.deferredPrompt = null; // sets deferredPrompt to null
    butInstall.classList.toggle('hidden', true); // toggles hidden, which is the class of the button, which is the install button
    console.log('PWA was installed');
    alert('PWA was installed');
    console.log(event);
});

