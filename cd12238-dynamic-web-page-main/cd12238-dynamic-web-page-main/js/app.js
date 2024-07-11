// Wait for the DOM to fully load before executing the script
document.addEventListener('DOMContentLoaded', () => {
    // Select all section elements
    const sections = document.querySelectorAll('section');
    // Get the navbar list element
    const navList = document.getElementById('navbar__list');

    // Create a nav item for each section and append it to the nav list
    sections.forEach(section => {
        const navItem = document.createElement('li');
        const navLink = document.createElement('a');
        // Set the href attribute to the section's id
        navLink.href = '#' + section.id;
        // Set the link text to the section's data-nav attribute
        navLink.textContent = section.dataset.nav;
        // Append the link to the list item
        navItem.appendChild(navLink);
        // Append the list item to the navbar list
        navList.appendChild(navItem);
    });

    // Function to set the active section
    function setActiveSection(section) {
        // Remove the active class from all sections
        sections.forEach(sec => {
            sec.classList.remove('active');
        });
        // Add the active class to the specified section
        section.classList.add('active');
    }

    // Create an IntersectionObserver to observe when sections intersect the viewport
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                // Set the active section when it intersects the viewport
                setActiveSection(entry.target);
            }
        });
    }, { threshold: 0.6 });

    // Observe each section with the IntersectionObserver
    sections.forEach(section => {
        observer.observe(section);
    });

    // Get the send button, comment input field, and comment section elements
    const sendButton = document.getElementById('sendButton');
    const commentInput = document.getElementById('commentInput');
    const commentSection = document.getElementById('commentSection');
    const nameInput = document.querySelector('input[placeholder="enter your name "]');
    const emailInput = document.querySelector('input[placeholder="enter your email "]');

    // Add an event listener to the send button
    sendButton.addEventListener('click', () => {
        // Get the text from the comment input field
        const commentText = commentInput.value;
        // Get the values from the name and email input fields
        const name = nameInput.value;
        const email = emailInput.value;

        // Validate the email address
        const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailPattern.test(email)) {
            alert('Please enter a valid email address.');
            return;
        }

        // Check if the comment text is not empty
        if (commentText !== '') {
            // Create a new div element for the comment
            const newCommentDiv = document.createElement('div');
            // Create a new paragraph element for the name and email
            const nameEmailParagraph = document.createElement('p');
            // Set the text content of the paragraph to include the name and email
            nameEmailParagraph.textContent = `Name: ${name} | Email: ${email}`;
            // Create a new paragraph element for the comment
            const newComment = document.createElement('p');
            // Set the text content of the paragraph to the comment text
            newComment.textContent = commentText;

            // Append the name and email paragraph and the comment to the new comment div
            newCommentDiv.appendChild(nameEmailParagraph);
            newCommentDiv.appendChild(newComment);
            // Append the new comment div to the comment section
            commentSection.appendChild(newCommentDiv);

            // Clear the input fields after adding the comment
            commentInput.value = '';
            nameInput.value = '';
            emailInput.value = '';
        }
    });
});
