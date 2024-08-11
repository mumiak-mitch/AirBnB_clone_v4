$(document).ready(function() {
    // Check API status and update the circle color
    $.get("http://0.0.0.0:5001/api/v1/status/", function(data) {
        if (data.status === "OK") {
            $("#api_status").addClass("available");
        } else {
            $("#api_status").removeClass("available");
        }
    });

    let selectedAmenities = {};

    // Listen for changes on each input checkbox tag
    $("input[type='checkbox']").change(function() {
        if ($(this).is(":checked")) {
            selectedAmenities[$(this).data("id")] = $(this).data("name");
        } else {
            delete selectedAmenities[$(this).data("id")];
        }

        // Update the h4 tag inside the div Amenities with the list of Amenities checked
        const amenitiesList = Object.values(selectedAmenities).join(", ");
        $(".amenities h4").text(amenitiesList.length > 0 ? amenitiesList : "&nbsp;");
    });

    // Function to fetch and display places based on selected amenities
    function fetchPlaces(amenities = {}) {
        $.ajax({
            url: "http://0.0.0.0:5001/api/v1/places_search/",
            type: "POST",
            contentType: "application/json",
            data: JSON.stringify({ amenities: Object.keys(amenities) }),
            success: function(data) {
                $(".places").empty(); // Clear existing places
                for (let place of data) {
                    $(".places").append(
                        `<article>
                            <div class="title_box">
                                <h2>${place.name}</h2>
                                <div class="price_by_night">$${place.price_by_night}</div>
                            </div>
                            <div class="information">
                                <div class="max_guest">${place.max_guest} Guest${place.max_guest !== 1 ? 's' : ''}</div>
                                <div class="number_rooms">${place.number_rooms} Bedroom${place.number_rooms !== 1 ? 's' : ''}</div>
                                <div class="number_bathrooms">${place.number_bathrooms} Bathroom${place.number_bathrooms !== 1 ? 's' : ''}</div>
                            </div>
                            <div class="description">
                                ${place.description}
                            </div>
                        </article>`
                    );
                }
            },
            error: function(error) {
                console.error("Error fetching places:", error);
            }
        });
    }

    // Initial fetch of all places
    fetchPlaces();

    // Fetch and display places based on selected amenities when the search button is clicked
    $("button").click(function() {
        fetchPlaces(selectedAmenities);
    });
});

