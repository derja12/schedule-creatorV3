window.jsPDF = window.jspdf.jsPDF;

// Runtime stuff
const HALF_HOUR_ARRAY = [
    "000",
    "030",
    "100",
    "130",
    "200",
    "230",
    "300",
    "330",
    "400",
    "430",
    "500",
    "530",
    "600",
    "630",
    "700",
    "730",
    "800",
    "830",
    "900",
    "930",
    "1000",
    "1030",
    "1100",
    "1130",
    "1200",
    "1230",
    "1300",
    "1330",
    "1400",
    "1430",
    "1500",
    "1530",
    "1600",
    "1630",
    "1700",
    "1730",
    "1800",
    "1830",
    "1900",
    "1930",
    "2000",
    "2030",
    "2100",
    "2130",
    "2200",
    "2230",
    "2300",
    "2330",
];
var COLORS_CHOSEN = {
    "#FFADAD" : false,
    "#FFD6A5" : false,
    "#FDFFB6" : false,
    "#CAFFBF" : false,
    "#9BF6FF" : false,
    "#A0C4FF" : false,
    "#BDB2FF" : false,
    "#FFC6FF" : false
};
var COLOR_OPTIONS = [
    "#FFADAD",
    "#FFD6A5",
    "#FDFFB6",
    "#CAFFBF",
    "#9BF6FF",
    "#A0C4FF",
    "#BDB2FF",
    "#FFC6FF"
];

// pseudo-database stuff(?)
var WEEKS = {}; // ex_week = {"ID": 001, "sun_id": "sun_001", ..., "sat_id": "sat_001"}
var DAYS = {}; // ex_day = {"ID": "mon_001", "week_id": 001, "start_time": "700", "end_time": "2200"}
var HALF_HOURS = {}; // ex_half_hour = {"ID": "930-mon-001", "csv_employee_ids": "0,2,5"}
var EMPLOYEES = {}; // ex_employee = {"ID": "0", "name": "Derek", "color": "#00CC99", "total_hours": 23, "requested_hours": 23}


var SWITCH_OBJECTS = {};
var SWITCH_MODE = false;
var SWITCH_MODE_AVAILABLE = false;
var SWITCH_MODE_UNAVAILABLE = true;
const MAIN_PAGE_AREA = document.querySelector("#main-wrapper");
LoadSelectPage();

// ======================= SELECT PAGE ============================

function LoadSelectPage() {
    MAIN_PAGE_AREA.innerHTML = ""; // Clear's the main page area

    select_page_body = createSelectPageBody();
    select_page_list_div = createSelectPageList();

    select_page_body.appendChild(select_page_list_div);
    MAIN_PAGE_AREA.appendChild(select_page_body);

    select_page_list = document.querySelector("#select-page-list");
    initializeListOptions(select_page_list);
    setSelectPageOnclicks();
    return;
}
// create select_page_body
function createSelectPageBody() {
    select_page_body = document.createElement("div");
    select_page_body.id = "select-page-body";
    select_page_body.classList.add("page-body");
    return select_page_body;
}
// create select_page_list_div
function createSelectPageList() {
    select_page_list_div = document.createElement("div");
    select_page_list_div.id = "select-page-list-div";
    
    select_page_list = document.createElement("div");
    select_page_list.id = "select-page-list";
    select_page_list_header = document.createElement("div");
    select_page_list_header.id = "select-page-list-header";
    select_page_list_header.innerHTML = "Schedule(s)";

    
    
    select_page_list_div.appendChild(select_page_list);
    select_page_list_div.appendChild(select_page_list_header);
    return select_page_list_div;
}
// INITIALIZE LIST OPTIONS
function initializeListOptions(list) {
    new_schedule_option = document.createElement("div");
    new_schedule_option.id = "new-schedule-option";
    new_schedule_option.classList.add("list-option");
    new_schedule_option.innerHTML = "&nbsp+ New Schedule...";

    list.appendChild(new_schedule_option);
    return;
}

// ++++++++++ ONCLICKS ++++++++++
function setSelectPageOnclicks() {
    document.querySelector("#new-schedule-option").onclick = function () {
        LoadCreateSchedulePage();
        return;
    }
}


// ======================= CREATE PAGE ============================

function LoadCreateSchedulePage() {
    MAIN_PAGE_AREA.innerHTML = ""; // Clear's the main page area

    new_page_body = createNewPageBody();
    new_page_form_div = createNewPageForm();

    new_page_body.appendChild(new_page_form_div);
    MAIN_PAGE_AREA.appendChild(new_page_body);
    setCreatePageOnclicks();
    return;
}
// create new_page_body
function createNewPageBody() {
    new_page_body = document.createElement("div");
    new_page_body.id = "new-page-body";
    new_page_body.classList.add("page-body");
    return new_page_body;
}
// create new_page_form_div
function createNewPageForm() {
    new_page_form_div = document.createElement("div");
    new_page_form_div.id = "new-page-form-div";
    
    new_page_form = document.createElement("div");
    new_page_form.id = "new-page-form";
    new_page_form_header = document.createElement("div");
    new_page_form_header.id = "new-page-form-header";
    new_page_form_header.innerHTML = "New Schedule";

    createFormLabels(new_page_form);
    createFormInputs(new_page_form);

    new_page_form_div.appendChild(new_page_form);
    new_page_form_div.appendChild(new_page_form_header);
    return new_page_form_div;
}
// create labels for form
function createFormLabels(form) {
    days_label = document.createElement("div");
    days_label.id = "form-label-days";
    days_label.classList.add("form-label");
    days_label.innerHTML = "&mdash; Check the days that will be worked.";
    hours_label = document.createElement("div");
    hours_label.id = "form-label-hours";
    hours_label.classList.add("form-label");
    hours_label.innerHTML = "&mdash; Select opening and closing hours.";
    name_label = document.createElement("div");
    name_label.id = "form-label-name";
    name_label.classList.add("form-label");
    name_label.innerHTML = "&mdash; Enter a schedule name.";
    form.appendChild(days_label);
    form.appendChild(hours_label);
    form.appendChild(name_label);
    return;
}
// create inputs for form
function createFormInputs(form) {
    days_check_area = document.createElement("div"); // check boxes - DAYS
    days_check_area.id = "form-input-check-area";
    days_check_area.classList.add("form-input");
    days_list = ["sun", "mon", "tue", "wed", "thur", "fri", "sat"]; 
    days_list.forEach(day_abr => {
        checkBox = document.createElement("input");
        checkBox.type = "checkbox";
        checkBox.id = "check-box-" + day_abr;
        checkBox.name = day_abr;
        checkBox.classList.add("check-box");
        checkBoxLabel = document.createElement("label");
        checkBoxLabel.id = "check-box-" + day_abr + "-label";
        checkBoxLabel.for = day_abr;
        checkBoxLabel.classList.add("check-box-label");
        checkBoxLabel.innerHTML = DAY_ABR_TO_FULL[day_abr];
        checkBoxDiv = document.createElement("div");
        checkBoxDiv.classList.add("check-box-div");
        checkBoxDiv.appendChild(checkBox);
        checkBoxDiv.appendChild(checkBoxLabel);
        checkBoxDiv.onclick = function () {
            document.querySelector("#check-box-"+day_abr).checked = !document.querySelector("#check-box-"+day_abr).checked;
        };
        days_check_area.appendChild(checkBoxDiv);
    });

    hours_area = document.createElement("div"); // selections - HOURS
    hours_area.id = "form-input-hours-area";
    hours_area.classList.add("form-input");
    open_hour_selection = document.createElement("select");
    open_hour_selection.id = "open-hour-select";
    possible_open_hours = ["12:00am","1:00am","2:00am","3:00am","4:00am","5:00am","6:00am","7:00am","8:00am","9:00am","10:00am","11:00am","12:00pm","1:00pm","2:00pm","3:00pm","4:00pm","5:00pm","6:00pm","7:00pm","8:00pm","9:00pm","10:00pm","11:00pm"]
    possible_open_hours.forEach(hour => {
        hour_option = document.createElement("option");
        hour_option.id = hour;
        hour_option.innerHTML = hour;
        hour_option.classList.add("hour-option");
        open_hour_selection.appendChild(hour_option);
    });
    hour_divider_p = document.createElement("div");
    hour_divider_p.id = "hour-divider-p";
    hour_divider_p.innerHTML = "till";
    close_hour_selection = document.createElement("select");
    close_hour_selection.id = "close-hour-select";
    possible_close_hours = ["12:00am","1:00am","2:00am","3:00am","4:00am","5:00am","6:00am","7:00am","8:00am","9:00am","10:00am","11:00am","12:00pm","1:00pm","2:00pm","3:00pm","4:00pm","5:00pm","6:00pm","7:00pm","8:00pm","9:00pm","10:00pm","11:00pm"]
    possible_close_hours.forEach(hour => {
        hour_option = document.createElement("option");
        hour_option.id = hour;
        hour_option.innerHTML = hour;
        hour_option.classList.add("hour-option");
        close_hour_selection.appendChild(hour_option);
    });
    hours_area.appendChild(open_hour_selection);
    hours_area.appendChild(hour_divider_p);
    hours_area.appendChild(close_hour_selection);

    name_area = document.createElement("div"); // input - NAME
    name_area.id = "form-input-name-area";
    name_area.classList.add("form-input");
    name_input = document.createElement("input");
    name_input.id = "name-input";
    name_input.placeholder = "Schedule01";
    name_area.appendChild(name_input);

    submit_button = document.createElement("button"); // button - SUBMIT
    submit_button.id = "form-submit-button";
    submit_button.innerHTML = "Create Schedule";

    form.appendChild(days_check_area);
    form.appendChild(hours_area);
    form.appendChild(name_area);
    form.appendChild(submit_button);
    return;
}
// ++++++++++ ONCLICKS ++++++++++
function setCreatePageOnclicks() {
    document.querySelector("#form-submit-button").onclick = function () {
        LoadSchedulePage(true);
        return;
    }
}

// ======================= SCHEDULE PAGE ============================

function LoadSchedulePage(is_new_schedule) {
    if (!is_new_schedule) {
        // MAIN_PAGE_AREA.innerHTML = ""; // Clear's the main page area
        // new_page_body = createNewPageBody();
        // new_page_form_div = createNewPageForm();
    
        // new_page_body.appendChild(new_page_form_div);
        // MAIN_PAGE_AREA.appendChild(new_page_body);
    } else {
        schedule_page_body = createSchedulePageBody();
        schedule_div = createScheduleDiv();
        schedule_page_body.appendChild(schedule_div);
        // populateEmployeeListDiv();
        MAIN_PAGE_AREA.innerHTML = "";
        MAIN_PAGE_AREA.appendChild(schedule_page_body);
        enableDevButtons();
        LoadEditEmployeesMode();
    }

    return;
}
// create schedule_page_body
function createSchedulePageBody() {
    schedule_page_body = document.createElement("div");
    schedule_page_body.id = "schedule-page-body";
    schedule_page_body.classList.add("page-body");
    return schedule_page_body;
}
// create schedule_div
function createScheduleDiv() {
    
    schedule_div = document.createElement("div");
    schedule_div.id = "schedule-page-div";

    opening_hour = document.querySelector("#open-hour-select").value; // figure out how many rows
    length = opening_hour.length;
    if (opening_hour == "12:00am") {
        opening_hour = 0;
    } else if (opening_hour == "12:00pm") {
        closing_hour = 12;
    } else if (opening_hour.slice(opening_hour.length-2) == "am") {
        opening_hour = parseInt(opening_hour.slice(0, length-2));
    } else {
        opening_hour = parseInt(opening_hour.slice(0, length-2)) * 2;
    }
    closing_hour = document.querySelector("#close-hour-select").value;
    length = closing_hour.length;
    if (closing_hour == "12:00am") {
        closing_hour = 0;
    } else if (closing_hour == "12:00pm") {
        closing_hour = 12;
    } else if (closing_hour.slice(closing_hour.length-2) == "am") {
        closing_hour = parseInt(closing_hour.slice(0, length-2));
    } else {
        closing_hour = parseInt(closing_hour.slice(0, length-2)) + 12;
    }
    open_index = opening_hour * 2;
    close_index = closing_hour * 2;
    opening_hour *= 100;
    closing_hour *= 100;

    empty_header = document.createElement("div"); // create headers for columns and rows
    empty_header.classList.add("schedule-header", "key-column");
    empty_header.id = "empty-header";
    schedule_div.appendChild(empty_header);
    for (i = open_index; i < close_index; i++) {
        half_hour = HALF_HOUR_ARRAY[i];
        half_hour_header = document.createElement("div");
        half_hour_header.classList.add("key-column", "row-"+half_hour);
        if ((Math.floor(parseInt(half_hour) / 100)) < 12) {am_or_pm = "am";} else {am_or_pm = "pm";}
        if (i % 2 == 1) {minutes = ":30";} else {minutes = ":00";}
        if (i < 2) {
            half_hour_header.innerHTML = "12" + minutes + "am";
        } else {
            half_hour_header.innerHTML = ((Math.floor((parseInt(half_hour) / 100)) % 13) + Math.floor(Math.floor((parseInt(half_hour) / 100)) / 13)).toString() + minutes + am_or_pm;
        }
        if (i == close_index - 1) {
            half_hour_header.style.borderBottom = "none";
        }
        schedule_div.appendChild(half_hour_header);
    }

    check_count = 0
    document.querySelectorAll(".check-box").forEach(checkBox => { // create columns (headers) / rows (hours)
        day_abr = checkBox.id.split("-")[2];
        if (checkBox.checked) {
            header = document.createElement("div");
            header.classList.add("schedule-header");
            header.id = day_abr + "-header";
            header.innerHTML = DAY_ABR_TO_FULL[day_abr];
            schedule_div.appendChild(header);

            for (i = open_index; i < close_index; i++) {
                half_hour = HALF_HOUR_ARRAY[i];
                half_hour_div = document.createElement("div");
                half_hour_div.classList.add(day_abr + "-column", "row-" + half_hour, "half-hour-div");
                half_hour_div.style.gridColumn = (check_count + 2).toString()+" / "+(check_count + 3).toString();
                half_hour_div.style.gridRow = ((i - open_index) + 2).toString()+" / "+((i - open_index) + 3).toString();
                if (i == close_index - 1) {
                    half_hour_div.style.borderBottom = "none";
                }
                schedule_div.appendChild(half_hour_div);
            }
            check_count += 1
        }
    });
    schedule_div.style.gridTemplateColumns = "auto repeat(" + (check_count).toString() + ", 1fr)";

    return schedule_div;
}

// pick new color
function pickNewColor() {
    chosen_color_in_use = true;
    while (chosen_color_in_use) {
        random_index = Math.floor(Math.random() * COLOR_OPTIONS.length);
        random_color = COLOR_OPTIONS[random_index];
        chosen_color_in_use = COLORS_CHOSEN[random_color];
    }
    chosen_color = random_color;
    COLORS_CHOSEN[chosen_color] = true;
    return chosen_color;
}
// enable Dev buttons
function enableDevButtons() {
    var edit_employee_button = document.querySelector("#edit-employee-button");
    edit_employee_button.addEventListener("click", editEmployeeButtonClick);

    var availability_mode_button = document.querySelector("#availability-mode-button");
    availability_mode_button.addEventListener("click", changeAvailabilityMode);
}

// ++++++++++ ONCLICKS ++++++++++
function editEmployeeButtonClick() {
    LoadEditEmployeesMode();
}
function changeAvailabilityMode() {
    SWITCH_MODE_AVAILABLE = !SWITCH_MODE_AVAILABLE;
    SWITCH_MODE_UNAVAILABLE = !SWITCH_MODE_UNAVAILABLE;
}


// ======================= Edit Employee PAGE ============================

function LoadEditEmployeesMode() {
    createEditEmployeePage();
    createCloseEditOnClicks();
    return;
}
// creates the dark-background and add-button
function createEditEmployeePage() {
    // create darkened-background
    var background_div = document.createElement("div");
    background_div.id = "edit-employee-background";
    background_div.classList.add("page-body");
    
    // create add-new-employee-button
    var add_employee_button = document.createElement("div");
    add_employee_button.id = "add-employee-button";
    add_employee_button.innerHTML = "New Employee...";
    add_employee_button.onclick = addEmployeeClick;
    
    // enable employee items
    employee_items = document.querySelectorAll(".employee-name-input");
    employee_items.forEach(item => {
        item.disabled = false;
    });

    // create dark-area over dev-buttons
    var darkened_button_div = document.createElement("div");
    darkened_button_div.id = "dark-button-div";

    document.querySelector("#dev-buttons-wrapper").appendChild(darkened_button_div);
    document.querySelector("#schedule-page-body").appendChild(background_div);
    document.querySelector("#main-wrapper").appendChild(add_employee_button);

    return;
}
// creates onclicks for leaving edit mode
function createCloseEditOnClicks() {
    var background = document.querySelector("#edit-employee-background");
    var darkened_button_area = document.querySelector("#dark-button-div");
    background.onclick = closeEditEmployeePage;
    darkened_button_area.onclick = closeEditEmployeePage;
}
// ++++++++++ ONCLICKS ++++++++++
// adds a new employee item
function addEmployeeClick() {
    employee_list_div = document.querySelector("#employee-list-div");
    new_employee_item = document.createElement("div");
    new_employee_item.classList.add("employee-item");
    new_employee_input = document.createElement("input");
    new_employee_input.classList.add("employee-name-input");
    new_employee_input.placeholder = "Employee01";
    new_employee_item.appendChild(new_employee_input);
    employee_list_div.style.gridTemplateColumns = "min-content " + employee_list_div.style.gridTemplateColumns;
    employee_list_div.appendChild(new_employee_item);

    color = pickNewColor();
    new_employee_item.style.backgroundColor = color;
    var id = createNewEmployee(color, 0, 0);
    new_employee_item.id = "employee-item-" + id;
    new_employee_input.id = "employee-name-input-" + id;
    new_employee_input.focus();
}
// closes and exits edit employee mode
function closeEditEmployeePage() {
    document.querySelector("#edit-employee-background").remove();
    document.querySelector("#add-employee-button").remove();
    document.querySelector("#dark-button-div").remove();
    employee_items = document.querySelectorAll(".employee-name-input");
    employee_items.forEach(item => {
        item.disabled = true;
    });
    updateEmployees();
    updateCollapseButton();
}


// ======================= EMPLOYEE FUNCTIONS ============================

function updateEmployees() {
    updateEmployeeNames();
    updateScheduleSwitches();
    applySwitchClicks();
}
// recreate switch boxes in the schedule
function updateScheduleSwitches() {
    // 
    
    var h = 0;
    var first_column = ""; 
    document.querySelectorAll(".half-hour-div").forEach(function (half_hour_div) {
        var column = half_hour_div.classList[0].split("-")[0]; // ex. "fri" or "sat"
        if (h == 0) {
            first_column = column;
        }
        var row = half_hour_div.classList[1].split("-")[1]; // ex. "930" or "1000"
        var template_columns = "";
        var i = 0;
        Object.keys(EMPLOYEES).forEach((employee_id) => {
            var employee_object = EMPLOYEES[employee_id];
            var employee_name = employee_object["name"]
            if (!document.querySelector("#switch-"+row+"-"+column+"-"+employee_id)) {
                var Switch = document.createElement("div");
                Switch.classList.add("switch-"+employee_id, "switch", "switch-"+row+"-"+column);
                Switch.id = "switch-"+row+"-"+column+"-"+employee_id;
                Switch.innerHTML = employee_name[0];
                Switch.classList.add("available");
                half_hour_div.appendChild(Switch);
                var obj = {"available" : true};
                SWITCH_OBJECTS[Switch.id] = obj;
                Switch.style.backgroundColor = employee_object["color"];
            }
            if (!Switch) {
                var Switch = document.querySelector("#switch-"+row+"-"+column+"-"+employee_id);
            }
            if (i == 0 && column != first_column) {
                Switch.style.borderLeft = "1px solid black";
            } else if (i == 0) {
                Switch.style.borderLeft = "none";
            } else if (i == EMPLOYEES - 1) {
                Switch.style.borderRight = "1px solid black";
            }
            i++;
            template_columns += " 1fr";
        });
        document.querySelectorAll(".switch-"+row+"-"+column).forEach((Switch) => {
            var used_employee_id = Switch.id.split("-")[3];
            var exists = false;
            Object.keys(EMPLOYEES).forEach((employee_id) => {
                if (employee_id == used_employee_id) {
                    exists = true;
                }
            });
            if (!exists) {
                Switch.remove();
            }
        });
        half_hour_div.style.gridTemplateColumns = template_columns;
        h++;
    });
}
// apply switch toggles onto switch divs
function applySwitchClicks() {
    var switches = document.querySelectorAll(".switch");
    document.querySelector("body").addEventListener("mousedown", function () {
        SWITCH_MODE = true;
    });
    document.querySelector("body").addEventListener("mouseup", function () {
        SWITCH_MODE = false;
    });
    switches.forEach(swich => {
        swich.addEventListener("mouseover", switchClicked.bind(this, [swich, false]), false);
        swich.addEventListener("mousedown", switchClicked.bind(this, [swich, true]), false);
    });    
}
// create new employee in memory
function createNewEmployee(color, total_hours, requested_hours) {
    var new_id = findNextEmployeeID();
    if (new_id == -1) {
        console.log("INVALID EMPLOYEE MADE WITH ID:", new_id);
    }
    EMPLOYEES[new_id] = {
        "ID": new_id,
        "name": "new_employee",
        "color": color,
        "total_hours": total_hours,
        "requested_hours": requested_hours
    };
    return new_id;
}
// find next id
function findNextEmployeeID() {
    if (Object.keys(EMPLOYEES).length == 0) { // id for an empty object
        return 0;
    }

    var last_id = -2;
    Object.keys(EMPLOYEES).forEach(employee_id => {
        if (last_id < EMPLOYEES[employee_id]["ID"]) {
            last_id = EMPLOYEES[employee_id]["ID"]
        }
    });
    
    return last_id + 1;
}
// update employee names
function updateEmployeeNames() {
    document.querySelectorAll(".employee-name-input").forEach((input) => { // update employee names with inputs
        var employee_id = input.id.split("-")[3];
        EMPLOYEES[employee_id]["name"] = input.value;
    });
    Object.keys(EMPLOYEES).forEach((employee_id) => { // update switch text
        var employee_name = EMPLOYEES[employee_id]["name"];
        document.querySelectorAll(".switch-"+employee_id).forEach((Switch) => {
            Switch.innerHTML = employee_name[0];
        });
    });
}
// ++++++++++ ONCLICKS ++++++++++
// toggles a given switch between available and unavailable
function switchClicked(parameter_array) {
    var Switch = parameter_array[0];
    var isClick = parameter_array[1];
    if (SWITCH_MODE || isClick) {
        if (SWITCH_MODE_AVAILABLE) {
            Switch.style.backgroundColor = EMPLOYEES[Switch["id"].split("-")[3]]["color"];
            SWITCH_OBJECTS[Switch.id] = true;
            Switch.classList.remove("unavailable");
            Switch.classList.add("available");
        } else if (SWITCH_MODE_UNAVAILABLE) {
            Switch.style.backgroundColor = "";
            SWITCH_OBJECTS[Switch.id] = false;
            Switch.classList.remove("available");
            Switch.classList.add("unavailable");
        }
        updateCollapseButton();
    }
}

// ======================= FINAL SCHEDULE FUNCTIONS ============================

function collapseToFinalSchedule() {
    
}
// check to see if collapse is possible
function checkForCollapsePossible() {
    var half_hour_divs = document.querySelectorAll(".half-hour-div");
    for (var hour_i = 0; hour_i < half_hour_divs.length; hour_i++) {
        var available_count = 0;
        for (var switch_i = 0; switch_i < half_hour_divs[hour_i].childNodes.length; switch_i++) {
            for (var i = 0; i < half_hour_divs[hour_i].childNodes[switch_i].classList.length; i++) {
                if (half_hour_divs[hour_i].childNodes[switch_i].classList[i] == "available") {
                    available_count += 1;
                }
            }
        }
        if (available_count > 1) {
            return false;
        }
    }
    return true;
}
// update collapse button
function updateCollapseButton() {
    var can_collapse = checkForCollapsePossible();
    var collapse_button = document.querySelector("#collapse-button");
    if (can_collapse) {
        collapse_button.style.backgroundColor = "rgba(200,50,20,1)";
        collapse_button.addEventListener("click", collapseScheduleClick);
    } else {
        collapse_button.style.backgroundColor = "";
        collapse_button.removeEventListener("click", collapseScheduleClick);
    }
}
// ++++++++++ ONCLICKS ++++++++++
function collapseScheduleClick() {
    collapseToFinalSchedule();
}


// ################################# CONVERSIONS #################################

const DAY_ABR_TO_FULL = {
    "sun" : "Sunday", 
    "mon" : "Monday", 
    "tue" : "Tuesday", 
    "wed" : "Wednesday", 
    "thur" : "Thursday", 
    "fri" : "Friday", 
    "sat" : "Saturday"
};