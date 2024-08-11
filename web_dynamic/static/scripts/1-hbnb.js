$(document).ready(function() {
    // Dictionary to store selected amenities
    let selectedAmenities = {};

    // Listen for changes on each input checkbox tag
    $('input[type="checkbox"]').change(function() {
        const amenityId = $(this).attr('data-id');
        const amenityName = $(this).attr('data-name');

        if ($(this).is(':checked')) {
            // If the checkbox is checked, add the Amenity ID to the dictionary
            selectedAmenities[amenityId] = amenityName;
        } else {
            // If the checkbox is unchecked, remove the Amenity ID from the dictionary
            delete selectedAmenities[amenityId];
        }

        // Update the h4 tag inside the div Amenities with the list of Amenities checked
        const amenityNames = Object.values(selectedAmenities).join(', ');
        $('.amenities h4').text(amenityNames || '&nbsp;');
    });
});

