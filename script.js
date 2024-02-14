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

// Assigns a category to a list of smaps
const assignCategoryToSmaps = async (smapIds, categoryId) => {
    for (const smapId of smapIds) {
        try {
            const response = await fetch(`https://platform.smapone.com/backend/intern/smaps/overview/${smapId}/categories`, {
                method: 'PUT',
                headers: {
                    'Authorization': authHeader,
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify([{ categoryId, isAssigned: true }])
            });
            if (!response.ok) {
                throw new Error(`Failed to assign category to smap ${smapId}`);
            }
        } catch (error) {
            console.error(`Error assigning category to smap ${smapId}:`, error);
        }
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
    smaps.forEach(smap => {
        const label = document.createElement('label');
        const checkbox = document.createElement('input');
        checkbox.type = 'checkbox';
        checkbox.value = smap.id;
        label.appendChild(checkbox);
        label.append(` ${smap.title}`);
        listElement.appendChild(label);
    });
};

// Handle category assignment to selected smaps
const assignCategories = async () => {
    const selectedCategoryId = document.getElementById('category-select').value;
    const checkedSmaps = Array.from(document.querySelectorAll('#smaps-list input:checked')).map(input => input.value);
    await assignCategoryToSmaps(checkedSmaps, selectedCategoryId);
    alert('Kategorien erfolgreich zugeordnet');
};

document.getElementById('load-smaps').addEventListener('click', loadSmaps);
document.getElementById('assign-category').addEventListener('click', assignCategories);

// Initialize categories on page load
loadCategories();
