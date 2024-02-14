// Utility to extract API token from the URL query parameters
const getApiToken = () => {
    const params = new URLSearchParams(window.location.search);
    return params.get('token');
};

// Prepare the authorization header with the API token
const apiToken = getApiToken();
const authHeader = 'Basic ' + btoa(':' + apiToken);

// Fetches categories from the API
const fetchCategories = async () => {
    try {
        const response = await fetch('https://platform.smapone.com/backend/intern/smaps/overview/categories', {
            method: 'GET',
            headers: {
                'Authorization': authHeader
            }
        });
        if (response.ok) {
            return await response.json();
        } else {
            throw new Error('Failed to fetch categories');
        }
    } catch (error) {
        console.error('Error fetching categories:', error);
    }
};

// Fetches smaps from the API
const fetchSmaps = async () => {
    try {
        const response = await fetch('https://platform.smapone.com/backend/v1/smaps', {
            method: 'GET',
            headers: {
                'Authorization': authHeader
            }
        });
        if (response.ok) {
            return await response.json();
        } else {
            throw new Error('Failed to fetch smaps');
        }
    } catch (error) {
        console.error('Error fetching smaps:', error);
    }
};

// Load categories into the select dropdown
const loadCategories = async () => {
    const categories = await fetchCategories();
    const select = document.getElementById('category-select');
    categories.forEach(category => {
        const option = document.createElement('option');
        option.value = category.id;
        option.textContent = category.title;
        select.appendChild(option);
    });
};

// Load smaps and display them as checkboxes
const loadSmaps = async () => {
    const smaps = await fetchSmaps();
    const listElement = document.getElementById('smaps-list');
    listElement.innerHTML = ''; // Clear current list
    smaps.sort().forEach(smap => {
        const label = document.createElement('label');
        const checkbox = document.createElement('input');
        checkbox.type = 'checkbox';
        checkbox.value = smap.smapId;
        label.appendChild(checkbox);
        label.append(` ${smap.name}`);
        listElement.appendChild(label);
    });
};

// Assigns a category to a list of smaps
const assignCategoryToSmaps = async (smapIds, categoryId, isAssigned) => {
    for (const smapId of smapIds) {
        try {
            const requestBody = {
                Categories: [
                    { categoryId: categoryId, isAssigned: isAssigned }
                ]
            };

            const response = await fetch(`https://platform.smapone.com/backend/intern/smaps/overview/${smapId}/categories`, {
                method: 'PUT',
                headers: {
                    'Authorization': authHeader,
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(requestBody)
            });
            if (!response.ok) {
                throw new Error(`Failed to ${isAssigned ? 'assign' : 'remove'} category from smap ${smapId}`);
            }
        } catch (error) {
            console.error(`Error ${isAssigned ? 'assigning' : 'removing'} category from smap ${smapId}:`, error);
        }
    }
};

// Handle category assignment to selected smaps
const assignCategories = async () => {
    const selectedCategoryId = document.getElementById('category-select').value;
    const checkedSmaps = Array.from(document.querySelectorAll('#smaps-list input:checked')).map(input => input.value);
    await assignCategoryToSmaps(checkedSmaps, selectedCategoryId, true);
    alert('Kategorien erfolgreich zugeordnet');
};

// Handle category removal from selected smaps
const removeCategories = async () => {
    const selectedCategoryId = document.getElementById('category-select').value;
    const checkedSmaps = Array.from(document.querySelectorAll('#smaps-list input:checked')).map(input => input.value);
    await assignCategoryToSmaps(checkedSmaps, selectedCategoryId, false);
    alert('Kategorien erfolgreich entfernt');
};

// Funktion zum Umschalten aller Checkboxen
const toggleAllCheckboxes = (toggle) => {
    const checkboxes = document.querySelectorAll('#smaps-list input[type="checkbox"]');
    checkboxes.forEach(checkbox => {
        checkbox.checked = toggle;
    });
};

// Event-Listener für die "Alle auswählen/abwählen" Checkbox
document.getElementById('toggle-all').addEventListener('change', function() {
    toggleAllCheckboxes(this.checked);
});

// Vorhandene Event-Listener und Initialisierungsfunktionen...
document.getElementById('load-smaps').addEventListener('click', loadSmaps);
document.getElementById('assign-category').addEventListener('click', assignCategories);
document.getElementById('remove-category').addEventListener('click', removeCategories);

// Initialize categories on page load
loadCategories();