$(document).ready(function () {

    // Only execute on events.html
    if ($('#eventsContainer').length) {
        loadEvents();
        loadParticipants();
    }

    // --- Dynamic Event Binding using .on() ---

    // 1. Open Modal Trigger
    $('#eventsContainer').on('click', '.register-btn', function () {
        const btn = $(this);
        const eventId = btn.data('id');
        const eventTitle = btn.data('title');

        // Populate modal
        $('#eventIdInput').val(eventId);
        $('#modalEventTitle').text(eventTitle);

        // Reset form state
        $('#registrationForm')[0].reset();
        $('.form-error').hide();
        $('#registrationForm').show();
        $('#submitRegistrationBtn').show();
        $('#successMessage').hide();

        // Show Modal
        $('#registrationModal').addClass('active');
    });

    // 2. Close Modal Triggers
    $('#closeModalBtn').on('click', closeModal);
    $('.modal-overlay').on('click', function (e) {
        if (e.target === this) closeModal();
    });

    // 3. Form Submission
    $('#registrationForm').on('submit', function (e) {
        e.preventDefault();

        if (validateForm()) {
            submitRegistration();
        }
    });

    // --- Core Functions ---

    function loadEvents() {
        $.ajax({
            url: '/api/events',
            type: 'GET',
            dataType: 'json',
            success: function (events) {
                renderEvents(events);
            },
            error: function () {
                $('#eventsContainer').html('<p style="color:#ff4757; text-align:center;">Failed to load events. Is the server running?</p>');
            }
        });
    }

    function loadParticipants() {
        $.ajax({
            url: '/api/participants',
            type: 'GET',
            dataType: 'json',
            success: function (participants) {
                renderParticipants(participants);
            },
            error: function () {
                console.error("Failed to load participants.");
            }
        });
    }

    function renderEvents(events) {
        const container = $('#eventsContainer');
        container.empty();

        if (events.length === 0) {
            container.html('<p>No events found.</p>');
            return;
        }

        let html = '';
        events.forEach(function (event) {

            // Advanced Challenge logic: Dynamic seats limitation
            const isFull = event.registered >= event.seats;
            const badgeClass = isFull ? 'full' : '';
            const statusText = isFull ? 'SOLD OUT' : `${event.seats - event.registered} seats left`;
            const btnState = isFull ? 'disabled' : '';
            const btnText = isFull ? 'Closed' : 'Register';

            html += `
                <div class="event-card">
                    <div class="card-banner" style="background-image: url('${event.banner}');">
                        <div class="seats-badge ${badgeClass}">${statusText}</div>
                    </div>
                    <div class="card-content">
                        <h3 class="card-title">${event.title}</h3>
                        <div class="card-meta">
                            <span><i class="fa-regular fa-calendar"></i> ${event.date}</span>
                            <span><i class="fa-solid fa-location-dot"></i> ${event.location}</span>
                        </div>
                        <p class="card-desc">${event.description}</p>
                        <button class="register-btn" 
                                data-id="${event.id}" 
                                data-title="${event.title}"
                                ${btnState}>
                            ${btnText}
                        </button>
                    </div>
                </div>
            `;
        });

        container.html(html);
    }

    function renderParticipants(participants) {
        const grid = $('#participantsGrid');
        grid.empty();

        // Sort to show newest first
        const sorted = participants.sort((a, b) => b.id - a.id);

        // Limit to latest 6 for aesthetic reasons on the front page
        const displayList = sorted.slice(0, 6);

        if (displayList.length === 0) {
            grid.html('<p style="color:var(--primary-color);">Be the first to register!</p>');
            return;
        }

        let html = '';
        displayList.forEach(p => {
            const initial = p.name ? p.name.charAt(0).toUpperCase() : '?';

            // Format time nicely
            const dateObj = new Date(p.timestamp);
            const timeString = dateObj.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });

            html += `
                <div class="participant-card">
                    <div class="p-avatar">${initial}</div>
                    <div class="p-info">
                        <h4>${p.name}</h4>
                        <p>Joined at ${timeString}</p>
                    </div>
                </div>
            `;
        });

        grid.html(html);
    }

    // Validator
    function validateForm() {
        let isValid = true;
        const nameInput = $('#participantName').val().trim();
        const emailInput = $('#participantEmail').val().trim();

        // Reset errors
        $('.form-error').hide();

        if (nameInput.length < 3) {
            $('#nameError').show();
            isValid = false;
        }

        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(emailInput)) {
            $('#emailError').show();
            isValid = false;
        }

        return isValid;
    }

    // Submission logic (AJAX POST JSON)
    function submitRegistration() {
        const btn = $('#submitRegistrationBtn');
        btn.prop('disabled', true).html('<i class="fa-solid fa-circle-notch fa-spin"></i> Processing...');

        const payload = {
            eventId: $('#eventIdInput').val(),
            name: $('#participantName').val().trim(),
            email: $('#participantEmail').val().trim()
        };

        $.ajax({
            url: '/api/register',
            type: 'POST',
            contentType: 'application/json',
            dataType: 'json',
            data: JSON.stringify(payload),

            success: function (response) {
                if (response.success) {
                    showSuccess();
                    // Refresh data globally to reflect seat changes and new participant
                    loadEvents();
                    loadParticipants();
                }
            },
            error: function (xhr) {
                btn.prop('disabled', false).html('Confirm Registration <i class="fa-solid fa-check"></i>');
                let errText = "An error occurred.";
                if (xhr.responseJSON && xhr.responseJSON.error) {
                    errText = xhr.responseJSON.error;
                }
                $('#serverError').text(errText).show();
            }
        });
    }

    function showSuccess() {
        $('#registrationForm').hide();
        $('#submitRegistrationBtn').hide();
        $('#successMessage').fadeIn();

        // Auto close modal after 3 seconds
        setTimeout(() => {
            closeModal();
        }, 3000);
    }

    function closeModal() {
        $('#registrationModal').removeClass('active');
    }

});
