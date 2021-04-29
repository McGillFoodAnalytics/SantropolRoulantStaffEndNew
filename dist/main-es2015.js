(window["webpackJsonp"] = window["webpackJsonp"] || []).push([["main"],{

/***/ "./node_modules/@angular/localize/fesm2015/init.js":
/*!*********************************************************!*\
  !*** ./node_modules/@angular/localize/fesm2015/init.js ***!
  \*********************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

/**
 * @license Angular v9.1.7
 * (c) 2010-2020 Google LLC. https://angular.io/
 * License: MIT
 */

/**
 * @license
 * Copyright Google Inc. All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */
const __globalThis = typeof globalThis !== 'undefined' && globalThis;
const __window = typeof window !== 'undefined' && window;
const __self = typeof self !== 'undefined' && typeof WorkerGlobalScope !== 'undefined' &&
    self instanceof WorkerGlobalScope && self;
const __global = typeof global !== 'undefined' && global;
// Always use __globalThis if available; this is the spec-defined global variable across all
// environments.
// Then fallback to __global first; in Node tests both __global and __window may be defined.
const _global = __globalThis || __global || __window || __self;

/**
 * @license
 * Copyright Google Inc. All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */
/**
 * Tag a template literal string for localization.
 *
 * For example:
 *
 * ```ts
 * $localize `some string to localize`
 * ```
 *
 * **Providing meaning, description and id**
 *
 * You can optionally specify one or more of `meaning`, `description` and `id` for a localized
 * string by pre-pending it with a colon delimited block of the form:
 *
 * ```ts
 * $localize`:meaning|description@@id:source message text`;
 *
 * $localize`:meaning|:source message text`;
 * $localize`:description:source message text`;
 * $localize`:@@id:source message text`;
 * ```
 *
 * This format is the same as that used for `i18n` markers in Angular templates. See the
 * [Angular 18n guide](guide/i18n#template-translations).
 *
 * **Naming placeholders**
 *
 * If the template literal string contains expressions, then the expressions will be automatically
 * associated with placeholder names for you.
 *
 * For example:
 *
 * ```ts
 * $localize `Hi ${name}! There are ${items.length} items.`;
 * ```
 *
 * will generate a message-source of `Hi {$PH}! There are {$PH_1} items`.
 *
 * The recommended practice is to name the placeholder associated with each expression though.
 *
 * Do this by providing the placeholder name wrapped in `:` characters directly after the
 * expression. These placeholder names are stripped out of the rendered localized string.
 *
 * For example, to name the `items.length` expression placeholder `itemCount` you write:
 *
 * ```ts
 * $localize `There are ${items.length}:itemCount: items`;
 * ```
 *
 * **Escaping colon markers**
 *
 * If you need to use a `:` character directly at the start of a tagged string that has no
 * metadata block, or directly after a substitution expression that has no name you must escape
 * the `:` by preceding it with a backslash:
 *
 * For example:
 *
 * ```ts
 * // message has a metadata block so no need to escape colon
 * $localize `:some description::this message starts with a colon (:)`;
 * // no metadata block so the colon must be escaped
 * $localize `\:this message starts with a colon (:)`;
 * ```
 *
 * ```ts
 * // named substitution so no need to escape colon
 * $localize `${label}:label:: ${}`
 * // anonymous substitution so colon must be escaped
 * $localize `${label}\: ${}`
 * ```
 *
 * **Processing localized strings:**
 *
 * There are three scenarios:
 *
 * * **compile-time inlining**: the `$localize` tag is transformed at compile time by a
 * transpiler, removing the tag and replacing the template literal string with a translated
 * literal string from a collection of translations provided to the transpilation tool.
 *
 * * **run-time evaluation**: the `$localize` tag is a run-time function that replaces and
 * reorders the parts (static strings and expressions) of the template literal string with strings
 * from a collection of translations loaded at run-time.
 *
 * * **pass-through evaluation**: the `$localize` tag is a run-time function that simply evaluates
 * the original template literal string without applying any translations to the parts. This
 * version is used during development or where there is no need to translate the localized
 * template literals.
 * @param messageParts a collection of the static parts of the template string.
 * @param expressions a collection of the values of each placeholder in the template string.
 * @returns the translated string, with the `messageParts` and `expressions` interleaved together.
 */
const $localize = function (messageParts, ...expressions) {
    if ($localize.translate) {
        // Don't use array expansion here to avoid the compiler adding `__read()` helper unnecessarily.
        const translation = $localize.translate(messageParts, expressions);
        messageParts = translation[0];
        expressions = translation[1];
    }
    let message = stripBlock(messageParts[0], messageParts.raw[0]);
    for (let i = 1; i < messageParts.length; i++) {
        message += expressions[i - 1] + stripBlock(messageParts[i], messageParts.raw[i]);
    }
    return message;
};
const BLOCK_MARKER = ':';
/**
 * Strip a delimited "block" from the start of the `messagePart`, if it is found.
 *
 * If a marker character (:) actually appears in the content at the start of a tagged string or
 * after a substitution expression, where a block has not been provided the character must be
 * escaped with a backslash, `\:`. This function checks for this by looking at the `raw`
 * messagePart, which should still contain the backslash.
 *
 * @param messagePart The cooked message part to process.
 * @param rawMessagePart The raw message part to check.
 * @returns the message part with the placeholder name stripped, if found.
 * @throws an error if the block is unterminated
 */
function stripBlock(messagePart, rawMessagePart) {
    return rawMessagePart.charAt(0) === BLOCK_MARKER ?
        messagePart.substring(findEndOfBlock(messagePart, rawMessagePart) + 1) :
        messagePart;
}
/**
 * Find the end of a "marked block" indicated by the first non-escaped colon.
 *
 * @param cooked The cooked string (where escaped chars have been processed)
 * @param raw The raw string (where escape sequences are still in place)
 *
 * @returns the index of the end of block marker
 * @throws an error if the block is unterminated
 */
function findEndOfBlock(cooked, raw) {
    /***********************************************************************************************
     * This function is repeated in `src/utils/messages.ts` and the two should be kept in sync.
     * The reason is that this file is marked as having side-effects, and if we import `messages.ts`
     * into it, the whole of `src/utils` will be included in this bundle and none of the functions
     * will be tree shaken.
     ***********************************************************************************************/
    for (let cookedIndex = 1, rawIndex = 1; cookedIndex < cooked.length; cookedIndex++, rawIndex++) {
        if (raw[rawIndex] === '\\') {
            rawIndex++;
        }
        else if (cooked[cookedIndex] === BLOCK_MARKER) {
            return cookedIndex;
        }
    }
    throw new Error(`Unterminated $localize metadata block in "${raw}".`);
}

/**
 * @license
 * Copyright Google Inc. All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */

/**
 * @license
 * Copyright Google Inc. All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */
// Attach $localize to the global context, as a side-effect of this module.
_global.$localize = $localize;
//# sourceMappingURL=init.js.map


/***/ }),

/***/ "./node_modules/raw-loader/dist/cjs.js!./src/app/account/account.component.html":
/*!**************************************************************************************!*\
  !*** ./node_modules/raw-loader/dist/cjs.js!./src/app/account/account.component.html ***!
  \**************************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony default export */ __webpack_exports__["default"] = ("<div class=\"page-title\">\n    <h1>Account</h1>\n</div>\n\n<body>\n\n    <div class=\"container\">\n        <div class=\"backbox\">\n            <div class=\"loginMsg\" [class.visibility]=\"loginMsgVisibility\">\n                <div class=\"textcontent\">\n                    <p class=\"title\">Don't have an account?</p>\n                    <button id=\"switch1\" (click)=\"signupMode()\">Sign Up</button>\n                </div>\n            </div>\n            <div class=\"signupMsg\" [class.visibility]=\"signupMsgVisibility\">\n                <div class=\"textcontent\">\n                    <p class=\"title\">Have an<br>account?</p>\n                    <button id=\"switch2\" (click)=\"loginMode()\">Login</button>\n                </div>\n            </div>\n        </div>\n\n        <div class=\"frontbox\" [class.animated]=\"shake\" [class.shake]=\"shake\" [class.moving]=\"frontBoxMoving\" [class.center]=\"center\">\n            <div class=\"login\" [class.hide]=\"loginHide\">\n                <h2>Login</h2>\n                <div class=\"inputbox\">\n                    <input type=\"text\" [(ngModel)]=\"email\" name=\"email\" placeholder=\"Email\">\n                    <input type=\"password\" [(ngModel)]=\"password\" name=\"password\" placeholder=\"Password\">\n                </div>\n                <p (click)=\"resetMode()\">Recover Password</p>\n                <button (click)=\"login()\" class=\"frontbutton\">LOG IN</button>\n            </div>\n\n            <div class=\"signup\" [class.hide]=\"signupHide\">\n                <h2>Sign up</h2>\n                <div class=\"inputbox\">\n                    <input type=\"text\" style=\"width: 50%; float: left;\" [(ngModel)]=\"firstName\" placeholder=\"First Name\">\n                    <input type=\"text\" style=\"width: 45%; float: right;\" [(ngModel)]=\"lastName\" placeholder=\"Last Name\">\n\n                    <input type=\"text\" [(ngModel)]=\"email\" name=\"email\" placeholder=\"Email\">\n                    <input type=\"password\" style=\"width: 70%; float: left;\" [(ngModel)]=\"password\" name=\"password\" placeholder=\"Password\">\n                    <input type=\"text\" style=\"width: 25%; float: right;\" [(ngModel)]=\"code\" name=\"code\" placeholder=\"Code\">\n\n                    <p class=\"displayname\" style=\"color: white; font-size: 12px; position: absolute; top: 71%;\">{{this.authService.error}}</p>\n\n                </div>\n                <button (click)=\"signup()\" class=\"frontbutton\">SIGN UP</button>\n            </div>\n\n            <div *ngIf=\"!loggedinHide\" class=\"loggedin\" [class.hide]=\"loggedinHide\">\n                <img class=\"profileicon\" src=\"https://flaticons.net/icon.php?slug_category=application&slug_icon=user-profile\">\n                <p class=\"displayname\">{{user.email}}</p>\n                <button class=\"leftbutton\">MANAGE</button>\n                <button (click)=\"logout()\" class=\"frontbutton\">LOGOUT</button>\n            </div>\n\n            <div class=\"reset\" [class.hide]=\"resetHide\">\n                <h2>Password Reset</h2>\n                <p>You will receive recovery instructions by email</p>\n                <div class=\"inputbox\">\n                    <input type=\"text\" [(ngModel)]=\"email\" name=\"email\" placeholder=\"Email\">\n                </div>\n                <button (click)=\"loginMode()\" class=\"leftbutton\">CANCEL</button>\n                <button (click)=\"reset()\" class=\"frontbutton\">SUBMIT</button>\n            </div>\n\n        </div>\n    </div>\n</body>\n");

/***/ }),

/***/ "./node_modules/raw-loader/dist/cjs.js!./src/app/app.component.html":
/*!**************************************************************************!*\
  !*** ./node_modules/raw-loader/dist/cjs.js!./src/app/app.component.html ***!
  \**************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony default export */ __webpack_exports__["default"] = ("<app-toolbar></app-toolbar>\n<router-outlet></router-outlet>\n");

/***/ }),

/***/ "./node_modules/raw-loader/dist/cjs.js!./src/app/bug-report/bug-report.component.html":
/*!********************************************************************************************!*\
  !*** ./node_modules/raw-loader/dist/cjs.js!./src/app/bug-report/bug-report.component.html ***!
  \********************************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony default export */ __webpack_exports__["default"] = ("<ng-template #content let-modal>\n\n  <!-- top of the window with the X button on the top-right corner-->\n   <div class=\"modal-header text-center\">\n      <h4 class=\"modal-title w-100\" id=\"modal-basic-title\" style=\"color: white\">Create New Bug Report</h4>\n      <button type=\"button\" class=\"close\" aria-label=\"Close\" (click)=\"modal.dismiss()\">\n        <span aria-hidden=\"true\">&times;</span>\n      </button>\n   </div>\n\n   <!-- main box where bug report is written into -->\n   <div class=\"modal-body\">\n      <form class=\"form\" (ngSubmit)=\"onSubmit()\" [formGroup]=\"myForm\">\n        <div class=\"form-row mb-12 div-desc\">\n            <mat-form-field class=\"desc\" appearance=fill>\n               <textarea matInput placeholder=\"Description of bug report\" formControlName=\"description\" [(ngModel)]=\"model.description\" rows=\"10\" col=\"40\" ></textarea>\n               <mat-error>Required!</mat-error>\n            </mat-form-field>\n          </div>\n      </form>\n   </div>\n\n   <!-- bottom of the bug pop-up window with submit and cancel button-->\n   <div class=\"footer\">\n     <button type=\"button\" class=\"btn btn-xl btn-outline-danger btn-cancel\" (click)=\"modal.dismiss(); close()\">Cancel</button>\n     <button type=\"submit\" class=\"btn btn-xl btn-outline-primary btn-submit\" (click)=\"onSubmit()\">Submit Report</button>\n   </div>\n</ng-template>\n\n<button mat-menu-item (click)=\"open(content)\">\n  <mat-icon>bug_report</mat-icon>\n  <span>New Bug Report</span>\n</button>\n\n<!-- <button class=\"btn btn-lg btn-outline-primary\" (click)=\"open(content)\">Create New Volunteer</button> -->\n");

/***/ }),

/***/ "./node_modules/raw-loader/dist/cjs.js!./src/app/change-registration-code/change-registration-code.component.html":
/*!************************************************************************************************************************!*\
  !*** ./node_modules/raw-loader/dist/cjs.js!./src/app/change-registration-code/change-registration-code.component.html ***!
  \************************************************************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony default export */ __webpack_exports__["default"] = ("<ng-template #content let-modal>\n  <div class=\"modal-header text-center\">\n    <h4 class=\"modal-title w-100\">Change Registration Code</h4>\n    <button type=\"button\" class=\"close\" aria-label=\"Close\" (click)=\"modal.dismiss()\" #closeModal>\n      <span aria-hidden=\"true\">&times;</span>\n    </button>\n  </div>\n  <div class=\"modal-body text-center\">\n    <form class=\"form\" (ngSubmit)=\"onSubmit()\" [formGroup]=\"myForm\">\n      <div class=\"form-row mb-12\">\n        <div class=\"form-group col-md-12\">\n          <h6>The current registration code is: <b> {{ (result | async) }} </b> </h6>\n        </div>\n      </div>\n      <div class=\"form-row mb-12\">\n        <div class=\"form-group col-md-12\">\n          <mat-form-field>\n            <input matInput placeholder=\"New Registration Code\" formControlName=\"new_registration_code\" [(ngModel)]=\"model.registration_code\">\n            <mat-error>Required!</mat-error>\n          </mat-form-field>\n        </div>\n      </div>\n    </form>\n  </div>\n  <div class=\"footer\">\n      <button type=\"submit\" class=\"btn btn-xl btn-outline-success btn-change-registration-code\" (click)=\"onSubmit()\">Change Registration Code</button>\n  </div>\n</ng-template>\n\n\n<button mat-menu-item (click)=\"open(content)\">\n  <mat-icon>edit</mat-icon>\n  <span>Change Registration Code</span>\n</button>\n");

/***/ }),

/***/ "./node_modules/raw-loader/dist/cjs.js!./src/app/detail/detail.component.html":
/*!************************************************************************************!*\
  !*** ./node_modules/raw-loader/dist/cjs.js!./src/app/detail/detail.component.html ***!
  \************************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony default export */ __webpack_exports__["default"] = ("<div class=\"container\">\n  <h1 class=\"title\">\n    {{ 'PAGES.DETAIL.TITLE' | translate }}\n  </h1>\n\n  <a routerLink=\"/\">{{ 'PAGES.DETAIL.BACK_TO_HOME' | translate }}</a>\n</div>\n");

/***/ }),

/***/ "./node_modules/raw-loader/dist/cjs.js!./src/app/mark-important-event/mark-important-event.component.html":
/*!****************************************************************************************************************!*\
  !*** ./node_modules/raw-loader/dist/cjs.js!./src/app/mark-important-event/mark-important-event.component.html ***!
  \****************************************************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony default export */ __webpack_exports__["default"] = ("<ng-template #content let-modal>\n  <div class=\"modal-header text-center\">\n    <h4 class=\"modal-title w-100\" id=\"modal-basic-title\">Market Event as Important</h4>\n    <button type=\"button\" class=\"close\" aria-label=\"Close\" (click)=\"modal.dismiss()\" #closeModal>\n      <span aria-hidden=\"true\">&times;</span>\n    </button>\n  </div>\n  <div class=\"modal-body text-center\">\n    <form class=\"form\" (ngSubmit)=\"onSubmit()\" [formGroup]=\"form\">\n      <div class=\"form-row mb-12\">\n        <div class=\"form-group col-md-6\">\n          <mat-form-field>\n            <mat-label>Event Type</mat-label>\n            <mat-select formControlName=\"event_type\" [(ngModel)]=\"model.event_type\">\n              <mat-option disabled>--Select Event Type--</mat-option>\n              <mat-option *ngFor=\"let event of eventTypes | keyvalue\" [value]=\"event.key\"> {{ event.key }} </mat-option>\n            </mat-select>\n            <mat-error>Required!</mat-error>\n          </mat-form-field>\n        </div>\n        <div class=\"form-group col-md-6\">\n          <mat-form-field>\n            <mat-label>Event Date</mat-label>\n            <mat-select formControlName=\"event_date\" [(ngModel)]=\"model.event_date\">\n              <mat-option disabled>--Select Event Date--</mat-option>\n              <mat-option *ngFor=\"let date of eventDates | keyvalue\" [value]=\"date.key\"> {{ date.key }} </mat-option>\n            </mat-select>\n            <mat-error>Required!</mat-error>\n          </mat-form-field>\n        </div>\n      </div>\n    </form>\n  </div>\n  <div class=\"footer\">\n      <button type=\"submit\" class=\"btn btn-xl btn-outline-danger\" (click)=\"onSubmit()\">Mark as Important</button>\n  </div>\n</ng-template>\n\n<button class=\"btn btn-lg btn-outline-danger\" (click)=\"open(content)\">Mark Important Event</button>\n");

/***/ }),

/***/ "./node_modules/raw-loader/dist/cjs.js!./src/app/new-user/new-user.component.html":
/*!****************************************************************************************!*\
  !*** ./node_modules/raw-loader/dist/cjs.js!./src/app/new-user/new-user.component.html ***!
  \****************************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony default export */ __webpack_exports__["default"] = ("<ng-template #content let-modal>\n  <div class=\"modal-header text-center\">\n    <h4 class=\"modal-title w-100\" id=\"modal-basic-title\">\n      Create New Volunteer\n    </h4>\n    <button\n      type=\"button\"\n      class=\"close\"\n      aria-label=\"Close\"\n      (click)=\"modal.dismiss()\"\n    >\n      <span aria-hidden=\"true\">&times;</span>\n    </button>\n  </div>\n  <div class=\"modal-body\">\n    <form class=\"form\" (ngSubmit)=\"onSubmit()\" [formGroup]=\"myForm\">\n      <div class=\"form-row mb-12\">\n        <h5 class=\"form-section\">Personal Information</h5>\n      </div>\n      <div class=\"form-row mb-12\">\n        <div class=\"form-group col-md-4\">\n          <mat-form-field>\n            <input\n              matInput\n              placeholder=\"First Name\"\n              formControlName=\"first_name\"\n              [(ngModel)]=\"model.first_name\"\n            />\n            <mat-error>Required!</mat-error>\n          </mat-form-field>\n        </div>\n        <div class=\"form-group col-md-4\">\n          <mat-form-field>\n            <input\n              matInput\n              placeholder=\"Last Name\"\n              formControlName=\"last_name\"\n              [(ngModel)]=\"model.last_name\"\n            />\n            <mat-error>Required!</mat-error>\n          </mat-form-field>\n        </div>\n        <div class=\"form-group col-md-4\">\n          <mat-form-field>\n            <mat-label> Birth Date </mat-label>\n            <input\n              matInput\n              [matDatepicker]=\"picker\"\n              [max]=\"today\"\n              placeholder=\"mm/dd/yyyy\"\n              formControlName=\"dob\"\n              [(ngModel)]=\"model.dob\"\n            />\n            <mat-datepicker-toggle\n              matSuffix\n              [for]=\"picker\"\n            ></mat-datepicker-toggle>\n            <mat-datepicker #picker></mat-datepicker>\n            <mat-error>Required!</mat-error>\n          </mat-form-field>\n        </div>\n      </div>\n      <hr />\n      <div class=\"form-row mb-12\">\n        <h5 class=\"form-section\">Contact Information</h5>\n      </div>\n      <div class=\"form-row mb-12\">\n        <div class=\"form-group col-md-4\">\n          <mat-form-field>\n            <input\n              matInput\n              placeholder=\"Street Number\"\n              formControlName=\"address_number\"\n              [(ngModel)]=\"model.address_number\"\n            />\n            <mat-error>Required!</mat-error>\n          </mat-form-field>\n        </div>\n        <div class=\"form-group col-md-4\">\n          <mat-form-field>\n            <input\n              matInput\n              placeholder=\"Street Name\"\n              formControlName=\"address_street\"\n              [(ngModel)]=\"model.address_street\"\n            />\n            <mat-error>Required!</mat-error>\n          </mat-form-field>\n        </div>\n        <div class=\"form-group col-md-4\">\n          <mat-form-field>\n            <input\n              matInput\n              placeholder=\"City\"\n              formControlName=\"address_city\"\n              [(ngModel)]=\"model.address_city\"\n            />\n            <mat-error>Required!</mat-error>\n          </mat-form-field>\n        </div>\n      </div>\n      <div class=\"form-row mb-12\">\n        <div class=\"form-group col-md-4\">\n          <mat-form-field>\n            <input\n              matInput\n              placeholder=\"Postal Code\"\n              formControlName=\"address_postal_code\"\n              [(ngModel)]=\"model.address_postal_code\"\n            />\n            <mat-error>Required!</mat-error>\n          </mat-form-field>\n        </div>\n        <div class=\"form-group col-md-4\">\n          <mat-form-field>\n            <input\n              matInput\n              email=\"true\"\n              placeholder=\"Email\"\n              formControlName=\"email\"\n              [(ngModel)]=\"model.email\"\n            />\n            <mat-error>Email required!</mat-error>\n          </mat-form-field>\n        </div>\n        <div class=\"form-group col-md-4\">\n          <mat-form-field>\n            <input\n              matInput\n              placeholder=\"Phone Number\"\n              formControlName=\"phone_number\"\n              [(ngModel)]=\"model.phone_number\"\n            />\n            <mat-error>Required!</mat-error>\n          </mat-form-field>\n        </div>\n      </div>\n      <hr />\n      <div class=\"form-row mb-12\">\n        <h5 class=\"form-section\">Emergency Contact Information (Optional)</h5>\n      </div>\n      <div class=\"form-row mb-12\">\n        <div class=\"form-group col-md-4\">\n          <mat-form-field>\n            <input\n              matInput\n              placeholder=\"Contact Name\"\n              formControlName=\"emergency_contact_name\"\n              [(ngModel)]=\"model.emergency_contact_name\"\n            />\n          </mat-form-field>\n        </div>\n        <div class=\"form-group col-md-4\">\n          <mat-form-field>\n            <input\n              matInput\n              placeholder=\"Contact Relationship\"\n              formControlName=\"emergency_relationship\"\n              [(ngModel)]=\"model.emergency_relationship\"\n            />\n          </mat-form-field>\n        </div>\n        <div class=\"form-group col-md-4\">\n          <mat-form-field>\n            <input\n              matInput\n              placeholder=\"Contact Number\"\n              formControlName=\"emergency_contact_number\"\n              [(ngModel)]=\"model.emergency_contact_number\"\n            />\n          </mat-form-field>\n        </div>\n      </div>\n    </form>\n  </div>\n  <div class=\"footer\">\n    <button\n      type=\"submit\"\n      class=\"btn btn-xl btn-outline-primary btn-add-volunteer\"\n      (click)=\"onSubmit()\"\n    >\n      Create Volunteer\n    </button>\n  </div>\n</ng-template>\n\n<button\n  class=\"btn-add\"\n  mat-icon-button\n  onclick=\"this.blur()\"\n  matTooltip=\"Click to add new volunteer\"\n  (click)=\"open(content)\"\n>\n  <mat-icon>person_add</mat-icon>\n</button>\n");

/***/ }),

/***/ "./node_modules/raw-loader/dist/cjs.js!./src/app/permanent-volunteer-directory/permanent-volunteer-directory.component.html":
/*!**********************************************************************************************************************************!*\
  !*** ./node_modules/raw-loader/dist/cjs.js!./src/app/permanent-volunteer-directory/permanent-volunteer-directory.component.html ***!
  \**********************************************************************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony default export */ __webpack_exports__["default"] = ("<ng-template #addPermanentModal let-modal>\n  <div class=\"modal-header text-center\">\n    <h4 class=\"modal-title w-100\"><i class=\"fa fa-map-marker\"></i>Permanent Volunteer</h4>\n    <button type=\"button\" class=\"close\" aria-label=\"Close\" (click)=\"modal.dismiss()\" #closeModal>\n      <span aria-hidden=\"true\">&times;</span>\n    </button>\n  </div>\n\n  <div class=\"modal-body text-center\">\n\n    <table class=\"table table-striped\">\n      <thead>\n      <tr>\n        <th scope=\"col\">Volunteer</th>\n        <th scope=\"col\">Event Type </th>\n        <th scope=\"col\">Start Date</th>\n        <th scope=\"col\">End Date</th>\n      </tr>\n      </thead>\n      <tbody>\n      <tr *ngFor=\"let event of eventsObservable | async\">\n        <th scope=\"row\">{{event.first_name}} {{event.last_name}}</th>\n        <td>\n          {{event.event_type}}\n\n        <td>\n          {{event.start_date}}\n        <td>\n        {{event.end_date}} <mat-icon (click)=\"delete(event.id)\">delete</mat-icon></td>\n      </tr>\n      </tbody>\n    </table>\n\n  </div>\n\n\n</ng-template>\n\n<button mat-menu-item (click)=\"open(addPermanentModal)\">\n  <mat-icon>date_range</mat-icon>\n  <span>Permanent Volunteer Directory</span>\n</button>\n");

/***/ }),

/***/ "./node_modules/raw-loader/dist/cjs.js!./src/app/permanent-volunteer/permanent-volunteer.component.html":
/*!**************************************************************************************************************!*\
  !*** ./node_modules/raw-loader/dist/cjs.js!./src/app/permanent-volunteer/permanent-volunteer.component.html ***!
  \**************************************************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony default export */ __webpack_exports__["default"] = ("<ng-template #addPermanentModal let-modal>\n    <div class=\"modal-header text-center\">\n        <h4 class=\"modal-title w-100\"><i class=\"fa fa-map-marker\"></i>Permanent Volunteer</h4>\n        <button type=\"button\" class=\"close\" aria-label=\"Close\" (click)=\"modal.dismiss()\" #closeModal>\n            <span aria-hidden=\"true\">&times;</span>\n        </button>\n    </div>\n\n    <div class=\"modal-body text-center\">\n\n\n        <form class=\"form\" (ngSubmit)=\"onSubmit()\" [formGroup]=\"addPermanentForm\">\n            <div class=\"form-row mb-12\">\n                <div class=\"form-group col-md-12\" style=\"margin-bottom:1rem;\">\n                    Add permanent volunteer markers:\n                </div>\n            </div>\n            <div class=\"form-row mb-12\">\n                <div class=\"form-group col-md-4\">\n                    <mat-form-field>\n                        <mat-label>Existing Volunteer</mat-label>\n                        <mat-select formControlName=\"volunteer\" [(ngModel)]=\"model.volunteer\">\n                            <mat-option disabled>--Select the volunteer--</mat-option>\n                            <mat-option *ngFor=\"let volunteer of volunteers\" [value]=\"[volunteer.key, volunteer.first_name, volunteer.last_name]\"> {{volunteer.first_name}} {{volunteer.last_name}} </mat-option>\n                        </mat-select>\n                        <mat-error>Required!</mat-error>\n                    </mat-form-field>\n                </div>\n                <div class=\"form-group col-md-4\">\n                    <mat-form-field>\n                        <mat-label>Frequency</mat-label>\n                        <mat-select formControlName=\"frequency\" [(ngModel)]=\"model.frequency\">\n                            <mat-option disabled>--Select the frequency--</mat-option>\n                            <mat-option [value]=\"1\"> Weekly </mat-option>\n                            <mat-option [value]=\"2\"> Biweekly </mat-option>\n                            <mat-option [value]=\"3\"> Triweekly </mat-option>\n                            <mat-option [value]=\"4\"> Monthly </mat-option>\n                        </mat-select>\n                        <mat-error>Required!</mat-error>\n                    </mat-form-field>\n                </div>\n                <div class=\"form-group col-md-4\">\n                    <mat-form-field>\n                        <mat-label>Event Type</mat-label>\n                        <mat-select formControlName=\"eventType\" [(ngModel)]=\"model.eventType\">\n                            <mat-option disabled>--Select the event type--</mat-option>\n                            <mat-option [value]=\"'kitam'\"> Kitchen AM </mat-option>\n                            <mat-option [value]=\"'kitpm'\"> Kitchen PM </mat-option>\n                            <mat-option [value]=\"'kitas'\"> Kitchen AM Sat </mat-option>\n                            <mat-option [value]=\"'kitps'\"> Kitchen PM Sat </mat-option>\n                            <mat-option [value]=\"'delds'\"> Delivery Driver Sat </mat-option>\n                            <mat-option [value]=\"'delis'\"> Delivery Sat </mat-option>\n                            <mat-option [value]=\"'deldr'\"> Delivery Driver </mat-option>\n                            <mat-option [value]=\"'deliv'\"> Delivery </mat-option>\n                        </mat-select>\n                        <mat-error>Required!</mat-error>\n                    </mat-form-field>\n                </div>\n                <div class=\"form-group col-md-6\">\n                    <mat-form-field>\n                        <mat-label>Start Date</mat-label>\n                        <input matInput [matDatepicker]=\"picker1\" [min]=\"today\" [max]=\"aYearFromNow\" placeholder=\"mm/dd/yyyy\" formControlName=\"startDate\" [(ngModel)]=\"model.startDate\">\n                        <mat-datepicker-toggle matSuffix [for]=\"picker1\"></mat-datepicker-toggle>\n                        <mat-datepicker #picker1></mat-datepicker>\n                        <mat-error *ngIf=\"startDateRequiredError()\">Required!</mat-error>\n                    </mat-form-field>\n                </div>\n                <div class=\"form-group col-md-6\">\n                    <mat-form-field>\n                        <mat-label>End Date</mat-label>\n                        <input matInput [matDatepicker]=\"picker\" [min]=\"today\" [max]=\"aYearFromNow\" placeholder=\"mm/dd/yyyy\" formControlName=\"endDate\" [(ngModel)]=\"model.endDate\">\n                        <mat-datepicker-toggle matSuffix [for]=\"picker\"></mat-datepicker-toggle>\n                        <mat-datepicker #picker></mat-datepicker>\n                        <mat-error *ngIf=\"endDateRequiredError()\">Required!</mat-error>\n                    </mat-form-field>\n                </div>\n            </div>\n        </form>\n        <button type=\"submit\" class=\"btn btn-xl btn-outline-success btn-change-registration-code\" (click)=\"onSubmit('add')\">Add Permanent Volunteer</button>\n\n\n\n    </div>\n\n\n</ng-template>\n\n<button mat-menu-item (click)=\"open(addPermanentModal)\">\n    <mat-icon>alarm</mat-icon>\n    <span>Add Permanent Volunteer</span>\n</button>");

/***/ }),

/***/ "./node_modules/raw-loader/dist/cjs.js!./src/app/shared/components/page-not-found/page-not-found.component.html":
/*!**********************************************************************************************************************!*\
  !*** ./node_modules/raw-loader/dist/cjs.js!./src/app/shared/components/page-not-found/page-not-found.component.html ***!
  \**********************************************************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony default export */ __webpack_exports__["default"] = ("<p>\n  page-not-found works!\n</p>\n");

/***/ }),

/***/ "./node_modules/raw-loader/dist/cjs.js!./src/app/sign-up-sheet/add-user-to-event/add-user-to-event.component.html":
/*!************************************************************************************************************************!*\
  !*** ./node_modules/raw-loader/dist/cjs.js!./src/app/sign-up-sheet/add-user-to-event/add-user-to-event.component.html ***!
  \************************************************************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony default export */ __webpack_exports__["default"] = ("<ng-template #addUserModal let-modal>\n    <div class=\"modal-header text-center\">\n        <h4 class=\"modal-title w-100\" id=\"modal-basic-title\"><i class=\"fa fa-user-plus\"></i>Add Volunteer to Event</h4>\n        <button type=\"button\" class=\"close\" aria-label=\"Close\" (click)=\"modal.dismiss()\" #closeModal>\n            <span aria-hidden=\"true\">&times;</span>\n        </button>\n    </div>\n    <div class=\"modal-body\">\n        <div class=\"form-row mb-12\">\n            Select a volunteer to add to the &nbsp; <b> {{ eventType }}</b> &nbsp; event on &nbsp; <b> {{ date }} </b>.\n            <mat-form-field class=\"search-volunteer\">\n                <input matInput (keyup)=\"applyFilter($event.target.value)\" placeholder=\"Filter\">\n                <mat-icon matSuffix>search</mat-icon>\n            </mat-form-field>\n            <div class=\"table-volunteers\">\n                <table mat-table [dataSource]=\"dataSource\" class=\"mat-elevation-z0\">\n                    <ng-container matColumnDef=\"first_name\">\n                        <th mat-header-cell *matHeaderCellDef> First name </th>\n                        <td mat-cell *matCellDef=\"let element\"> {{element.first_name}} </td>\n                    </ng-container>\n                    <!-- Name Column -->\n                    <ng-container matColumnDef=\"last_name\">\n                        <th mat-header-cell *matHeaderCellDef> Last name </th>\n                        <td mat-cell *matCellDef=\"let element\"> {{element.last_name}} </td>\n                    </ng-container>\n                    <!-- Weight Column -->\n                    <ng-container matColumnDef=\"email\">\n                        <th mat-header-cell *matHeaderCellDef> Email </th>\n                        <td mat-cell *matCellDef=\"let element\"> {{element.email}} </td>\n                    </ng-container>\n                    <tr mat-header-row *matHeaderRowDef=\"displayedColumns; sticky: true\"></tr>\n                    <tr mat-row *matRowDef=\"let row; columns: displayedColumns; let i = index\" (click)=\"setClickedRow(i, row)\" [class.active]=\"i == selectedRowIndex\">\n                    </tr>\n                </table>\n            </div>\n        </div>\n    </div>\n    <div class=\"footer\">\n        <button type=\"submit\" class=\"btn btn-xl btn-outline-danger btn-add-volunteer\" (click)=\"onSubmit()\">Add Volunteer to Event</button>\n    </div>\n</ng-template>\n");

/***/ }),

/***/ "./node_modules/raw-loader/dist/cjs.js!./src/app/sign-up-sheet/event-note/event-note.component.html":
/*!**********************************************************************************************************!*\
  !*** ./node_modules/raw-loader/dist/cjs.js!./src/app/sign-up-sheet/event-note/event-note.component.html ***!
  \**********************************************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony default export */ __webpack_exports__["default"] = ("<ng-template #content let-modal>\n    <div class=\"modal-header text-center\">\n        <h4 class=\"modal-title w-100\" id=\"modal-basic-title\">Event Note</h4>\n        <button type=\"button\" class=\"close\" aria-label=\"Close\" (click)=\"modal.dismiss(); close()\" #closeModal>\n            <span aria-hidden=\"true\">&times;</span>\n        </button>\n    </div>\n    <div class=\"modal-body\">\n          <div class=\"form-row mb-12 desc\">\n              <span *ngIf=\"eventNote; else noEventNote\">Below is the event note for the <b> {{ eventType }} </b> event on <b> {{ date }}</b>. Click on the textbox to edit.</span>\n              <ng-template #noEventNote>\n                <span>Insert an event note for the <b> {{ eventType }} </b> event on <b> {{ date }}. </b></span>\n              </ng-template>\n          </div>\n          <div contenteditable=\"true\"\n            [textContent]=\"eventNote\" (input)=\"eventNote=$event.target.textContent; touch()\">\n          </div>\n    </div>\n    <div class=\"footer\">\n        <button *ngIf=\"touched\" type=\"button\" class=\"btn btn-xl btn-outline-danger btn-cancel\" (click)=\"modal.dismiss(); close()\">Cancel</button>\n        <button *ngIf=\"touched\" type=\"submit\" class=\"btn btn-xl btn-outline-danger btn-insert-staff-note\" (click)=\"onSubmit()\">Save Event Note</button>\n    </div>\n</ng-template>\n\n<img class=\"event-note\" src=\"assets/event-note.png\" width=\"27px\" style=\"margin-top: -4px;\" (click)=\"open(content)\">\n");

/***/ }),

/***/ "./node_modules/raw-loader/dist/cjs.js!./src/app/sign-up-sheet/event-sign-up-table/event-sign-up-table.component.html":
/*!****************************************************************************************************************************!*\
  !*** ./node_modules/raw-loader/dist/cjs.js!./src/app/sign-up-sheet/event-sign-up-table/event-sign-up-table.component.html ***!
  \****************************************************************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony default export */ __webpack_exports__["default"] = ("\n\n<table mat-table [dataSource]=\"dataSource\" class=\"mat-elevation-z0\">\n    <!-- Slot Column -->\n    <!-- <ng-container matColumnDef=\"slot\">\n        <th mat-header-cell *matHeaderCellDef></th>\n        <td mat-cell *matCellDef=\"let element\"></td>\n    </ng-container> -->\n    <!-- Volunteer Column -->\n    <ng-container matColumnDef=\"volunteer\">\n      <div *ngIf=\"id == 'N/A'; else vol\"><th mat-header-cell *matHeaderCellDef >No Event</th></div>\n        <th mat-header-cell *matHeaderCellDef #vol > Volunteer </th>\n        <td mat-cell *matCellDef=\"let element\">\n          <div style=\"height: 1px;\" *ngIf=\"id == 'N/A'; else shortNote\" ></div>\n          <div #shortNote style=\"font-size: 10px !important; margin-left: -5px;\" *ngIf=\"element.staff_note != null && element.staff_note.length > 0  && element.staff_note.length < 20; else noNote\"> {{ element.first_name }} {{ element.last_name }} ({{element.staff_note}})</div>\n          <ng-template #noNote>\n            <div style=\"font-size: 10px !important; margin-left: -5px;\" *ngIf=\"element.staff_note == null || element.staff_note.length == 0; else longNote\"> {{ element.first_name }} {{ element.last_name }} </div>\n            <ng-template #longNote> <div style=\"font-size: 9px !important; margin-left: -5px; margin-top: -10px;\"> {{ element.first_name }} {{ element.last_name }}\n              <button\n              matTooltip=\"Click to view note\"\n              onclick=\"this.blur()\"\n              style=\"margin-bottom: -20px; width: 12px; height: 1px; border: none ; transform: scale(0.78); \">\n              <mat-icon style=\" margin-left: -4px; vertical-align: middle; \">chat</mat-icon>\n              <app-staff-note id=\"noteBtn\"\n                            firstName={{element.first_name}}\n                            lastName={{element.last_name}}\n                            date={{element.event_date_txt}}\n                            [eventType]=\"eventType\"\n                            staffNote={{element.staff_note}}\n                            (insertStaffNote)=\"onInsertStaffNote(element.id, $event)\">\n            </app-staff-note>\n             </button>\n           </div>\n        </ng-template>\n      </ng-template>\n    </ng-container>\n    <!-- Actions Column -->\n    <ng-container matColumnDef=\"actions\">\n        <th mat-header-cell *matHeaderCellDef></th>\n        <td mat-cell *matCellDef=\"let element\">\n          <button class=\"menu\" mat-icon-button [matMenuTriggerFor]=\"menu\" #MenuTrigger=\"matMenuTrigger\" *ngIf=\"!isEmpty(element.first_name, element.last_name);\" style=\"float:right; transform: scale(0.87); margin-right: -10px; \">\n              <mat-icon>more_vert</mat-icon>\n          </button>\n\n          <mat-menu #menu=\"matMenu\">\n            <app-remove-user-from-event firstName={{element.first_name}}\n                                        eventId={{element.id}}\n                                        userId={{element.uid}}\n                                        lastName={{element.last_name}}\n                                        date={{element.event_date_txt}}\n                                        [eventType]=\"eventType\"\n                                        (confirmRemove)=\"onRemoveUserFromEvent(element.id)\">\n            </app-remove-user-from-event>\n            <app-staff-note\n                            firstName={{element.first_name}}\n                            lastName={{element.last_name}}\n                            date={{element.event_date_txt}}\n                            [eventType]=\"eventType\"\n                            staffNote={{element.staff_note}}\n                            (insertStaffNote)=\"onInsertStaffNote(element.id, $event)\">\n            </app-staff-note>\n            <button mat-menu-item [routerLink]=\"['/volunteer', element.uid]\">\n                <mat-icon>person</mat-icon>\n                <span>View Volunteer</span>\n            </button>\n          </mat-menu>\n        </td>\n    </ng-container>\n    <tr mat-header-row *matHeaderRowDef=\"displayedColumns; sticky: true\"></tr>\n    <tr mat-row *matRowDef=\"let row; columns: displayedColumns;\"\n                class=\"table-row\"\n                [attr.isEmpty]=\"isEmpty(row.first_name, row.last_name, id)\"\n                (click)=\"isEmpty(row.first_name, row.last_name, id) && openAddUserModal(row)\"\n                ></tr>\n</table>\n");

/***/ }),

/***/ "./node_modules/raw-loader/dist/cjs.js!./src/app/sign-up-sheet/mark-permanent-event/mark-permanent-event.component.html":
/*!******************************************************************************************************************************!*\
  !*** ./node_modules/raw-loader/dist/cjs.js!./src/app/sign-up-sheet/mark-permanent-event/mark-permanent-event.component.html ***!
  \******************************************************************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony default export */ __webpack_exports__["default"] = ("<ng-template #content let-modal>\n<div class=\"modal-header text-center\">\n  <h4 class=\"modal-title w-100\" id=\"modal-basic-title\">Confirm Removal</h4>\n  <button type=\"button\" class=\"close\" aria-label=\"Close\" (click)=\"modal.dismiss()\" #closeModal>\n    <span aria-hidden=\"true\">&times;</span>\n  </button>\n</div>\n<div class=\"modal-body\" style=\"padding-top:2rem; padding-bottom:2rem;\">\n  <div class=\"row\">\n    <div class=\"col-3\">\n      <img src=\"assets/warning.png\" width=80px style=\"margin-bottom:1rem;marin:auto\">\n    </div>\n    <div class=\"col-9\">\n        <div> You are about to remove <b> {{ firstName }} {{lastName}} </b> from the <b> Kitchen AM</b> event on <b> {{ date }}</b>. <br /> <br /> Are you sure?<b> This cannot be undone! </b></div>\n    </div>\n  </div>\n  <!-- <img src=\"assets/warning.png\" width=100px style=\"margin-bottom:1rem;\">\n  <div> You are about to remove <b> Alexa Hernandez </b> from the <b> Kitchen AM</b> event on <b> Monday, November 13th, 2019</b>. <br /> <br /> Are you sure?<b> This cannot be undone! </b></div> -->\n</div>\n<div class=\"footer\">\n    <button type=\"button\" class=\"btn btn-xl btn-outline-danger\" (click)=\"modal.dismiss()\" style=\"margin-right:1rem;\">Cancel</button>\n    <button type=\"submit\" class=\"btn btn-xl btn-outline-danger\" (click)=\"onSubmit()\" style=\"color:white; background:#dc3545\">Remove Volunteer</button>\n</div>\n</ng-template>\n\n\n<img src=\"assets/push-pin-unfilled.png\" width=35px (click)=\"open(content)\">\n");

/***/ }),

/***/ "./node_modules/raw-loader/dist/cjs.js!./src/app/sign-up-sheet/new-schedule/new-schedule.component.html":
/*!**************************************************************************************************************!*\
  !*** ./node_modules/raw-loader/dist/cjs.js!./src/app/sign-up-sheet/new-schedule/new-schedule.component.html ***!
  \**************************************************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony default export */ __webpack_exports__["default"] = ("<p>gello</p>\n<table mat-table\n       [dataSource]=\"dataSource\"\n       multiTemplateDataRows\n       matSort\n       class=\"mat-elevation-z8\">\n   <ng-container matColumnDef=\"{{column}}\" *ngFor=\"let column of displayedColumns\">\n      <th mat-header-cell *matHeaderCellDef mat-sort-header>{{prettify(column)}}</th>\n      <td mat-cell *matCellDef=\"let element\">{{element[column]}}</td>\n   </ng-container>\n   <!-- Expanded Element Content - The detail row is made up of this one column that spans across all columns -->\n   <ng-container matColumnDef=\"expandedDetail\">\n      <td mat-cell *matCellDef=\"let element\" [attr.colspan]=\"displayedColumns.length\">\n      <div class=\"element-detail\"\n           [@detailExpand]=\"element == expandedElement ? 'expanded' : 'collapsed'\">\n        <div class=\"container\">\n           <!-- Expanded element header -->\n           <div class=\"header valign-center\">\n              <span class=\"volunteer-name\">\n              {{capitalize(element.first_name)}}  {{capitalize(element.last_name)}}\n              </span>\n              <span class=\"actions\">\n                 <mat-icon>edit</mat-icon>\n                 <app-user-event [userId]=\"element.id\"></app-user-event>\n              </span>\n           </div>\n           <!-- Expanded element body -->\n           <div class=\"body\">\n              <div class=\"row\">\n                 <div class=\"col-4 valign-center\">\n                    <mat-icon matTooltip=\"User ID\">account_circle</mat-icon>\n                    {{element.id}}\n                 </div>\n                 <div class=\"col-4 valign-center\">\n                    <mat-icon matTooltip=\"Birth date\">cake</mat-icon>\n                    {{element.dob}}\n                 </div>\n                 <div class=\"col-4 valign-center\">\n                    <mat-icon matTooltip=\"Sign up date\">how_to_reg</mat-icon>\n                    {{element.signup_date}}\n                 </div>\n              </div>\n              <div class=\"row\" style=\"padding-top: 0.5rem\">\n                 <div class=\"col-4 valign-center\">\n                    <mat-icon matTooltip=\"Address\">home</mat-icon>\n                    <span>{{element.address_number}} {{element.address_street}}, {{element.address_city}}, {{capitalize(element.address_postal_code)}}</span>\n                 </div>\n                 <div class=\"col-4 valign-center\">\n                    <mat-icon matTooltip=\"Number\">phone_android</mat-icon>\n                    {{element.phone_number}}\n                 </div>\n                 <div class=\"col-4 valign-center\">\n                    <mat-icon matTooltip=\"Email\">email</mat-icon>\n                    {{element.email}}\n                 </div>\n              </div>\n           </div>\n        </div>\n      </div>\n      </td>\n   </ng-container>\n   <tr mat-header-row *matHeaderRowDef=\"displayedColumns\"></tr>\n   <tr mat-row *matRowDef=\"let element; columns: displayedColumns;\"\n       class=\"element-row\"\n       [class.expanded-row]=\"expandedElement === element\"\n       (click)=\"expandedElement = element\">\n   </tr>\n   <tr mat-row *matRowDef=\"let row; columns: ['expandedDetail']\" class=\"detail-row\"></tr>\n</table>\n");

/***/ }),

/***/ "./node_modules/raw-loader/dist/cjs.js!./src/app/sign-up-sheet/remove-user-from-event/remove-user-from-event.component.html":
/*!**********************************************************************************************************************************!*\
  !*** ./node_modules/raw-loader/dist/cjs.js!./src/app/sign-up-sheet/remove-user-from-event/remove-user-from-event.component.html ***!
  \**********************************************************************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony default export */ __webpack_exports__["default"] = ("<ng-template #content let-modal>\n    <div class=\"modal-header text-center\">\n        <h4 class=\"modal-title w-100\" id=\"modal-basic-title\">Confirm Removal</h4>\n        <button type=\"button\" class=\"close\" aria-label=\"Close\" (click)=\"modal.dismiss()\" #closeModal>\n            <span aria-hidden=\"true\">&times;</span>\n        </button>\n    </div>\n    <div class=\"modal-body\">\n        <div class=\"row\">\n            <div class=\"col-3\">\n                <img class=\"img-warning\" src=\"assets/warning.png\" width=80px>\n            </div>\n            <div class=\"col-9\">\n                <div> You are about to remove <b> {{ firstName }} {{ lastName }} </b> from the <b> {{ eventType }}</b> event on <b> {{ date }}</b>.\n                    <br />\n                    <br /> Are you sure?<b> This cannot be undone! </b></div>\n            </div>\n        </div>\n    </div>\n    <div contenteditable=\"true\"\n            [textContent]=\"cancellationNote\" (input)=\"cancellationNote=$event.target.textContent; touch()\">\n          </div> \n    <div class=\"footer\">\n        <button type=\"button\" class=\"btn btn-xl btn-outline-danger btn-cancel\" (click)=\"modal.dismiss()\">Cancel</button>\n        <button type=\"submit\" class=\"btn btn-xl btn-outline-danger btn-remove-volunteer\" (click)=\"onSubmit()\">Remove Volunteer</button>\n    </div>\n</ng-template>\n\n<button mat-menu-item (click)=\"open(content)\">\n    <mat-icon>delete_forever</mat-icon>\n    <span>Remove Volunteer</span>\n</button>\n");

/***/ }),

/***/ "./node_modules/raw-loader/dist/cjs.js!./src/app/sign-up-sheet/sign-up-sheet.component.html":
/*!**************************************************************************************************!*\
  !*** ./node_modules/raw-loader/dist/cjs.js!./src/app/sign-up-sheet/sign-up-sheet.component.html ***!
  \**************************************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony default export */ __webpack_exports__["default"] = ("<div id=\"loaderBackground\">\n    <div class=\"loader\" id=\"spinner\">\n    </div>\n</div>\n\n<div class=\"container-fluid\" style=\"padding: 0;\">\n    <div class=\"row\" style=\"padding-top: 2rem; padding-bottom: 1rem;\">\n        <div class=\"col\" id=\"header\" style=\"text-align: center;\">\n            <img src=\"../../../assets/santropol-logo.png\" alt=\"\" id=\"logo\" />\n            <h1 class=\"header-text\"\n                style=\"padding: 0.5rem; text-align: center; color: #60a4ff;\">\n                Volunteer Schedule\n            </h1>\n        </div>\n    </div>\n    <div class=\"row\" style=\"padding-bottom: 2rem;\">\n        <div class=\"col\">\n            <div class=\"card\" style=\"margin-top: -16px;\">\n                <div class=\"card-header\">\n                    <div class=\"row\">\n                        <div class=\"col-8 offset-2\"\n                             style=\"text-align:center\">\n                            <button class=\"btn\"\n                                    (click)=\"prevWeek()\"\n                                    onclick=\"this.blur()\"\n                                    *ngIf=\"currentWeek != 'first'\">\n                                <mat-icon>arrow_back_ios</mat-icon>\n                            </button>\n                            {{ getWeekTitle() }}\n                            <button class=\"btn\"\n                                    (click)=\"nextWeek()\"\n                                    onclick=\"this.blur()\"\n                                    *ngIf=\"currentWeek != 'third'\">\n                                <mat-icon>arrow_forward_ios</mat-icon>\n                            </button>\n                        </div>\n                        <div class=\"col-2\" style=\"text-align: right;\">\n                            <select *ngIf=\"currentWeek == 'third'\"\n                                    class=\"browser-default custom-select\"\n                                    [(ngModel)]=\"currentEvent\"\n                                    style=\"\n                  background-color: #5fce99 !important;\n                  color: white;\n                  border: none;\n                \">\n                                <option disabled> Event Type </option>\n                                <option *ngFor=\"let event of eventTypes | keyvalue\"\n                                        [ngValue]=\"event.key\">\n                                    {{ event.key }}\n                                </option>\n                            </select>\n                        </div>\n                    </div>\n                </div>\n            </div>\n        </div>\n    </div>\n\n    <div class=\"container-fluid\">\n        <app-slider [activePane]=\"currentWeek\">\n            <div firstPane>\n                <div class=\"row\"\n                style=\"margin-bottom: -30px; float: right; margin-right: 13%;\"\n                *ngFor=\"let coolEvent of eventArray\">\n               <h3 id=\"eventTitle\" *ngIf='currentWeek == \"first\"'>{{coolEvent}}</h3>\n               <div class=\"row-2 \"\n                    *ngFor=\"\n         let day of getEventListCool(coolEvent) | keyvalue;\n         let i = index\n       \"\n                    style=\"padding-bottom: 2rem\">\n                   <div class=\"card\" [class.eventCardImportant]=\"day.value.is_important_event\">\n                       <div class=\"card-header\" id=\"cardTitle\"\n                            *ngIf=\"\n             (coolEvent == 'Kitchen AM' && day.value.is_important_event);\n             else importantEventFalseHeader\n           \"\n                                 style=\"background-color: #f24a5a;\">\n                                {{ day.value.display_date | date: \"EEEE, MMM d\" }}\n                            </div>\n                            <ng-template #importantEventFalseHeader>\n                                <div class=\"card-header\" *ngIf=\"coolEvent == 'Kitchen AM'\" id=\"cardTitle\">\n                                    {{ day.value.display_date | date: \"EEEE, MMM d\" }}\n                                </div>\n                            </ng-template>\n                            <div class=\"card-body\">\n                                <app-event-sign-up-table [slots]=\"day.value.slots\"\n                                                         [id]=\"day.value.slots[0].id\"\n                                                         [eventType]=\"coolEvent\"\n                                                         (removeUserFromEvent)=\"removeUserFromEvent($event)\"\n                                                         (insertStaffNote)=\"insertStaffNote($event)\">\n                                </app-event-sign-up-table>\n                                <!-- {{day.value.num_volunteers}}/{{day.value.num_slots}}\n                                                <div *ngIf=\"day.value.num_volunteers === 0; else volunteersRegistered\" style=\"text-align:center\"> No volunteers registered </div>\n                                                <ng-template #volunteersRegistered>\n                                                    <ul class=\"list-group list-group-flush\" *ngFor=\"let slot of day.value.slots\">\n                                                        <li class=\"list-group-item\" *ngIf=\"slot.first_name\">{{slot.first_name}} {{slot.last_name}}\n                                                            <app-remove-user-from-event firstName={{slot.first_name}} lastName={{slot.last_name}} date={{slot.event_date_txt}} [eventType]=\"currentEvent\" (onConfirm)=\"removeUserFromEvent(slot.id)\" matTooltip=\"Click to remove this volunteer from this event\"></app-remove-user-from-event>\n                                                            <app-permanent-volunteer [isPermanent]=\"isPermanentEvent(slot)\" firstName={{slot.first_name}} lastName={{slot.last_name}} weekday={{slot.event_date_txt}} [eventType]=\"currentEvent\" (onPermanentVolunteerEvent)=\"permanentVolunteerEvent($event, slot.id, slot.uid, day.value.display_date, slot.first_name, slot.last_name, slot)\"></app-permanent-volunteer>\n                                                        </li>\n                                                    </ul>\n                                                </ng-template> -->\n                            </div>\n                            <div class=\"card-footer\" style=\"text-align: center;\" *ngIf='day.value.slots[0].id != \"N/A\"'>\n                                <img class=\"img-important-event-true\"\n                                     *ngIf=\"day.value.is_important_event; else importantEventFalse\"\n                                     src=\"assets/important-event-true.png\"\n                                     width=\"30px\"\n                                     style=\"margin-right: 1rem;\"\n                                     (click)=\"changeEventImportanceCool(day.key, coolEvent)\"\n                                     matTooltip=\"Click to mark this event as unimportant\" />\n                                <ng-template #importantEventFalse>\n                                    <img class=\"img-important-event-false\"\n                                         src=\"assets/important-event-false.png\"\n                                         width=\"30px\"\n                                         style=\"margin-right: 1rem;\"\n                                         (click)=\"changeEventImportanceCool(day.key, coolEvent)\"\n                                         matTooltip=\"Click to mark this event as important\" />\n                                </ng-template>\n                                <!-- <app-add-user-to-event *ngIf=\"day.value.num_volunteers < day.value.num_slots; else fullEvent\" [volunteerList]=\"volunteerList\" date={{day.value.slots[0].event_date_txt}} [eventType]=\"currentEvent\" [fullEvent]=\"false\" (onAddUser)=\"addUserToEvent($event, day.value)\" style=\"cursor: pointer;\"  matTooltip=\"Click to add a volunteer to this event\"></app-add-user-to-event>\n                                                <ng-template #fullEvent>\n                                                  <app-add-user-to-event [volunteerList]=\"volunteerList\" date={{day.value.slots[0].event_date_txt}} [eventType]=\"currentEvent\" [fullEvent]=\"true\" (onAddUser)=\"addUserToEvent($event, day.value)\" style=\"opacity:0.4\"></app-add-user-to-event>\n                                                </ng-template> -->\n                                <app-event-note date=\"{{ day.value.slots[0].event_date_txt }}\"\n                                                [eventType]=\"coolEvent\"\n                                                eventNote=\"{{ day.value.slots[0].event_note }}\"\n                                                (updateEventNote)=\"\n                    updateEventNote(day.value.slots[0].id, $event)\n                  \"\n                                                matTooltip=\"Click to view & edit the event note\">\n                                </app-event-note>\n                                <mat-icon style=\"margin-left: 5px; margin-top: -8px; transform: scale(0.8);\"\n                                    *ngIf=\"\n                                          day.value.slots[0].event_note !=null &&\n                                          day.value.slots[0].event_note.length>\n                                    0\n                                    \"\n                                    >announcement\n                                </mat-icon>\n                                <app-add-user-to-event></app-add-user-to-event>\n                            </div>\n                        </div>\n                    </div>\n                </div>\n            </div>\n\n            <div secondPane>\n                <div class=\"row\"\n                     style=\"margin-bottom: -30px; float: right; margin-right: 13%;\"\n                     *ngFor=\"let coolEvent of eventArray\">\n                    <h3 id=\"eventTitle\" *ngIf='currentWeek == \"second\"'>{{coolEvent}}</h3>\n                    <div class=\"row-2\"\n                         *ngFor=\"let day of getEventListCool(coolEvent) | keyvalue;\n              let i = index\"\n                         style=\"padding-bottom: 2rem; font-size: 15px;\">\n                        <div class=\"card\" [class.eventCardImportant]=\"day.value.is_important_event\" >\n                            <div class=\"card-header\" id=\"cardTitle\"\n                                 *ngIf=\"\n                  (coolEvent == 'Kitchen AM' && day.value.is_important_event);\n                  else importantEventFalseHeader\n                \"\n                                 style=\"background-color: #f24a5a;\">\n                                {{ day.value.display_date | date: \"EEEE, MMM d\" }}\n                            </div>\n                            <ng-template #importantEventFalseHeader>\n                                <div class=\"card-header\" id=\"cardTitle\"\n                                     *ngIf=\"coolEvent == 'Kitchen AM'\">\n                                    {{ day.value.display_date | date: \"EEEE, MMM d\" }}\n                                </div>\n                            </ng-template>\n                            <div class=\"card-body\">\n                                <app-event-sign-up-table [slots]=\"day.value.slots\"\n                                                         [id]=\"day.value.slots[0].id\"\n                                                         [eventType]=\"coolEvent\"\n                                                         (removeUserFromEvent)=\"removeUserFromEvent($event)\"\n                                                         (insertStaffNote)=\"insertStaffNote($event)\">\n                                </app-event-sign-up-table>\n                                <!-- {{day.value.num_volunteers}}/{{day.value.num_slots}}\n                                                <div *ngIf=\"day.value.num_volunteers === 0; else volunteersRegistered\" style=\"text-align:center\"> No volunteers registered </div>\n                                                <ng-template #volunteersRegistered>\n                                                    <ul class=\"list-group list-group-flush\" *ngFor=\"let slot of day.value.slots\">\n                                                        <li class=\"list-group-item\" *ngIf=\"slot.first_name\">{{slot.first_name}} {{slot.last_name}}\n                                                            <app-remove-user-from-event firstName={{slot.first_name}} lastName={{slot.last_name}} date={{slot.event_date_txt}} [eventType]=\"currentEvent\" style=\"float:right\" (onConfirm)=\"removeUserFromEvent(slot.id)\" matTooltip=\"Click to remove this volunteer from this event\"></app-remove-user-from-event>\n                                                            <app-permanent-volunteer [isPermanent]=\"isPermanentEvent(slot)\" firstName={{slot.first_name}} lastName={{slot.last_name}} weekday={{slot.event_date_txt}} [eventType]=\"currentEvent\" (onPermanentVolunteerEvent)=\"permanentVolunteerEvent($event, slot.id, slot.uid, day.value.display_date, slot.first_name, slot.last_name, slot)\"></app-permanent-volunteer>\n                                                        </li>\n                                                    </ul>\n                                                </ng-template> -->\n                            </div>\n                            <div class=\"card-footer\" style=\"text-align: center;\" *ngIf='day.value.slots[0].id != \"N/A\"'>\n                                <img class=\"img-important-event-true\"\n                                     *ngIf=\"day.value.is_important_event; else importantEventFalse\"\n                                     src=\"assets/important-event-true.png\"\n                                     width=\"30px\"\n                                     style=\"margin-right: 1rem;\"\n                                     (click)=\"changeEventImportanceCool(day.key, coolEvent)\"\n                                     matTooltip=\"Click to mark this event as unimportant\" />\n                                <ng-template #importantEventFalse>\n                                    <img class=\"img-important-event-false\"\n                                         src=\"assets/important-event-false.png\"\n                                         width=\"30px\"\n                                         style=\"margin-right: 1rem;\"\n                                         (click)=\"changeEventImportanceCool(day.key, coolEvent)\"\n                                         matTooltip=\"Click to mark this event as important\" />\n                                </ng-template>\n                                <!-- <app-add-user-to-event *ngIf=\"day.value.num_volunteers < day.value.num_slots; else fullEvent\" [volunteerList]=\"volunteerList\" date={{day.value.slots[0].event_date_txt}} [eventType]=\"currentEvent\" [fullEvent]=\"false\" (onAddUser)=\"addUserToEvent($event, day.value)\" style=\"cursor: pointer;\" matTooltip=\"Click to add a volunteer to this event\"></app-add-user-to-event>\n                                                <ng-template #fullEvent>\n                                                  <app-add-user-to-event [volunteerList]=\"volunteerList\" date={{day.value.slots[0].event_date_txt}} [eventType]=\"currentEvent\" [fullEvent]=\"true\" (onAddUser)=\"addUserToEvent($event, day.value)\" style=\"opacity:0.4\"></app-add-user-to-event>\n                                                </ng-template> -->\n                                <app-event-note date=\"{{ day.value.slots[0].event_date_txt }}\"\n                                                [eventType]=\"coolEvent\"\n                                                eventNote=\"{{ day.value.slots[0].event_note }}\"\n                                                (updateEventNote)=\"\n                    updateEventNote(day.value.slots[0].id, $event)\n                  \"\n                                                matTooltip=\"Click to view & edit the event note\">\n                                </app-event-note>\n                                <mat-icon style=\"margin-left: 5px; margin-top: -8px; transform: scale(0.8);\"\n                                          *ngIf=\"\n                                          day.value.slots[0].event_note !=null &&\n                                          day.value.slots[0].event_note.length>\n                                    0\n                                    \"\n                                    >announcement\n                                </mat-icon>\n                            </div>\n                        </div>\n                    </div>\n                </div>\n            </div>\n\n            <div thirdPane>\n                <div class=\"row\" style=\"padding-bottom: 2rem;\">\n                    <div class=\"col-3\"\n                         *ngFor=\"let day of getEventList() | keyvalue; let i = index\"\n                         style=\"padding-bottom: 2rem;\">\n                        <div class=\"card\" id=\"cardTitle3\">\n                            <div class=\"card-header\" id=\"cardTitle3\"\n                                 *ngIf=\"\n                  day.value.is_important_event;\n                  else importantEventFalseHeader\n                \"\n                                 style=\"background-color: #f24a5a;\">\n                                {{ day.value.display_date | date: \"EEEE, MMM d\" }}\n                            </div>\n                            <ng-template #importantEventFalseHeader>\n                                <div class=\"card-header\" id=\"cardTitle3\">\n                                    {{ day.value.display_date | date: \"EEEE, MMM d\" }}\n                                </div>\n                            </ng-template>\n                            <div class=\"card-body\" style=\"width: 100%;\">\n                                <app-event-sign-up-table [slots]=\"day.value.slots\"\n                                                         [eventType]=\"currentEvent\"\n                                                         (removeUserFromEvent)=\"removeUserFromEvent($event)\"\n                                                         (insertStaffNote)=\"insertStaffNote($event)\">\n                                </app-event-sign-up-table>\n                                <!-- {{day.value.num_volunteers}}/{{day.value.num_slots}}\n                                                <div *ngIf=\"day.value.num_volunteers === 0; else volunteersRegistered\" style=\"text-align:center\"> No volunteers registered </div>\n                                                <ng-template #volunteersRegistered>\n                                                    <ul class=\"list-group list-group-flush\" *ngFor=\"let slot of day.value.slots\">\n                                                        <li class=\"list-group-item\" *ngIf=\"slot.first_name\">{{slot.first_name}} {{slot.last_name}}\n                                                            <app-remove-user-from-event firstName={{slot.first_name}} lastName={{slot.last_name}} date={{slot.event_date_txt}} [eventType]=\"currentEvent\" style=\"float:right\" (onConfirm)=\"removeUserFromEvent(slot.id)\" matTooltip=\"Click to remove this volunteer from this event\"></app-remove-user-from-event>\n                                                            <app-permanent-volunteer [isPermanent]=\"isPermanentEvent(slot)\" firstName={{slot.first_name}} lastName={{slot.last_name}} weekday={{slot.event_date_txt}} [eventType]=\"currentEvent\" (onPermanentVolunteerEvent)=\"permanentVolunteerEvent($event, slot.id, slot.uid, day.value.display_date, slot.first_name, slot.last_name, slot)\"></app-permanent-volunteer>\n                                                        </li>\n                                                    </ul>\n                                                </ng-template> -->\n                            </div>\n                            <div class=\"card-footer\" style=\"text-align: center;\">\n                                <img class=\"img-important-event-true\"\n                                     *ngIf=\"day.value.is_important_event; else importantEventFalse\"\n                                     src=\"assets/important-event-true.png\"\n                                     width=\"30px\"\n                                     style=\"margin-right: 1rem;\"\n                                     (click)=\"changeEventImportance(day.key)\"\n                                     matTooltip=\"Click to mark this event as unimportant\" />\n                                <ng-template #importantEventFalse>\n                                    <img class=\"img-important-event-false\"\n                                         src=\"assets/important-event-false.png\"\n                                         width=\"30px\"\n                                         style=\"margin-right: 1rem;\"\n                                         (click)=\"changeEventImportance(day.key)\"\n                                         matTooltip=\"Click to mark this event as important\" />\n                                </ng-template>\n                                <!-- <app-add-user-to-event *ngIf=\"day.value.num_volunteers < day.value.num_slots; else fullEvent\" [volunteerList]=\"volunteerList\" date={{day.value.slots[0].event_date_txt}} [eventType]=\"currentEvent\" [fullEvent]=\"false\" (onAddUser)=\"addUserToEvent($event, day.value)\" style=\"cursor: pointer;\" matTooltip=\"Click to add a volunteer to this event\"></app-add-user-to-event>\n                                                <ng-template #fullEvent>\n                                                  <app-add-user-to-event [volunteerList]=\"volunteerList\" date={{day.value.slots[0].event_date_txt}} [eventType]=\"currentEvent\" [fullEvent]=\"true\" (onAddUser)=\"addUserToEvent($event, day.value)\" style=\"opacity:0.4\"></app-add-user-to-event>\n                                                </ng-template> -->\n                                <app-event-note date=\"{{ day.value.slots[0].event_date_txt }}\"\n                                                [eventType]=\"currentEvent\"\n                                                eventNote=\"{{ day.value.slots[0].event_note }}\"\n                                                (updateEventNote)=\"\n                    updateEventNote(day.value.slots[0].id, $event)\n                  \"\n                                                matTooltip=\"Click to view & edit the event note\">\n                                </app-event-note>\n                                <mat-icon *ngIf=\"\n                                          day.value.slots[0].event_note !=null &&\n                                          day.value.slots[0].event_note.length>\n                                    0\n                                    \"\n                                    >announcement\n                                </mat-icon>\n                            </div>\n                        </div>\n                    </div>\n                </div>\n            </div>\n        </app-slider>\n    </div>\n</div>\n");

/***/ }),

/***/ "./node_modules/raw-loader/dist/cjs.js!./src/app/sign-up-sheet/staff-note/staff-note.component.html":
/*!**********************************************************************************************************!*\
  !*** ./node_modules/raw-loader/dist/cjs.js!./src/app/sign-up-sheet/staff-note/staff-note.component.html ***!
  \**********************************************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony default export */ __webpack_exports__["default"] = ("<ng-template #content let-modal>\n    <div class=\"modal-header text-center\">\n        <h4 class=\"modal-title w-100\" id=\"modal-basic-title\">Staff Note</h4>\n        <button type=\"button\" class=\"close\" aria-label=\"Close\" (click)=\"modal.dismiss(); close()\" #closeModal>\n            <span aria-hidden=\"true\">&times;</span>\n        </button>\n    </div>\n    <div class=\"modal-body\">\n          <div class=\"form-row mb-12 desc\">\n              <span *ngIf=\"currentStaffNote; else noStaffNote\">Below is the staff note for <b> {{ firstName }} {{ lastName }} </b> for the <b> {{ eventType }} </b> event on <b> {{ date }}  </b></span>\n              <ng-template #noStaffNote>\n                <span>Insert a staff note for <b> {{ firstName }} {{ lastName }} </b> for the <b> {{ eventType }} </b> event on <b> {{ date }}  </b></span>\n              </ng-template>\n          </div>\n          <div contenteditable=\"true\"\n            [textContent]=\"currentStaffNote\" (input)=\"currentStaffNote=$event.target.textContent; touch()\">\n          </div>\n    </div>\n    <div class=\"footer\">\n        <button *ngIf=\"touched\" type=\"button\" class=\"btn btn-xl btn-outline-danger btn-cancel\" (click)=\"modal.dismiss(); close()\">Cancel</button>\n        <button *ngIf=\"touched\" type=\"submit\" class=\"btn btn-xl btn-outline-danger btn-insert-staff-note\" (click)=\"onSubmit()\">Save Staff Note</button>\n    </div>\n</ng-template>\n\n<button mat-menu-item (click)=\"open(content)\">\n    <mat-icon>notes</mat-icon>\n    <span>Staff Note</span>\n</button>\n");

/***/ }),

/***/ "./node_modules/raw-loader/dist/cjs.js!./src/app/slider/slider.component.html":
/*!************************************************************************************!*\
  !*** ./node_modules/raw-loader/dist/cjs.js!./src/app/slider/slider.component.html ***!
  \************************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony default export */ __webpack_exports__["default"] = ("<div class=\"panes\" [@slide]=\"activePane\">\n  <div><ng-content select=\"[firstPane]\"></ng-content></div>\n  <div><ng-content select=\"[secondPane]\"></ng-content></div>\n  <div><ng-content select=\"[thirdPane]\"></ng-content></div>\n</div>\n");

/***/ }),

/***/ "./node_modules/raw-loader/dist/cjs.js!./src/app/toolbar/notifications/notifications.component.html":
/*!**********************************************************************************************************!*\
  !*** ./node_modules/raw-loader/dist/cjs.js!./src/app/toolbar/notifications/notifications.component.html ***!
  \**********************************************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony default export */ __webpack_exports__["default"] = ("<button mat-icon-button class=\"notification-menu\" [matMenuTriggerFor]=\"notficationMenu\">\n    <mat-icon class=\"notifications\" [matBadge]=\"notifications.length\" [matBadgeHidden]=\"notifications.length < 1\" matBadgeColor=\"warn\">\n        alarm\n    </mat-icon>\n</button>\n<mat-menu #notficationMenu=\"matMenu\" class=\"mat-menu-nofication\" (closed)=\"onClickOutside()\" xPosition=\"before\">\n    <div class=\"notification-header row\">\n        <div class=\"label col-5\">Notifications</div>\n        <a *ngIf=\"notificationsNotEmpty()\" class=\"col-6 mark-all-as-read\" (click)=\"markAllAsRead($event)\">Mark all as read\n    </a>\n    </div>\n    <mat-selection-list #list *ngIf=\"notificationsNotEmpty(); else notificationsEmpty\" [(ngModel)]=\"selectedNotifications\" (ngModelChange)=\"onNgModelChange($event)\">\n        <mat-list-option *ngFor=\"let n of notifications | keyvalue\" [value]=\"n.key\" [selected]=\"n.value.read\" (click)=\"blockClose($event)\" [attr.isRead]=\"isRead(n.value.read)\">\n            {{n.value.msg}}\n        </mat-list-option>\n    </mat-selection-list>\n    <ng-template #notificationsEmpty>\n        <div class=\"no-notifications\"> No notifications </div>\n    </ng-template>\n</mat-menu>\n");

/***/ }),

/***/ "./node_modules/raw-loader/dist/cjs.js!./src/app/toolbar/toolbar.component.html":
/*!**************************************************************************************!*\
  !*** ./node_modules/raw-loader/dist/cjs.js!./src/app/toolbar/toolbar.component.html ***!
  \**************************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony default export */ __webpack_exports__["default"] = ("<mat-toolbar [hidden]=\"!show\" color=\"primary\" style=\"display:flex; background-color: #449afe\">\n  <button class=\"menu-btn\" #r=\"matMenuTrigger\" mat-icon-button [matMenuTriggerFor]=\"menu\" >\n    <mat-icon (onClick)=\"open(r)\">menu</mat-icon>\n  </button>\n  <mat-menu #menu=\"matMenu\" [overlapTrigger]=\"false\">\n    <app-change-registration-code></app-change-registration-code>\n    <app-bug-report></app-bug-report>\n    <app-permanent-volunteer></app-permanent-volunteer>\n    <!-- <app-week-generator></app-week-generator> -->\n    <app-permanent-volunteer-directory></app-permanent-volunteer-directory>\n  </mat-menu>\n  <div style=\"padding-left:0.5rem\"> Santropol Roulant </div>\n  <div style=\"margin-left:auto;\">\n      <a style=\"padding-right:1rem\" routerLink=\"/volunteer-schedule\"> <span>Volunteer Schedule </span></a>\n      <a style=\"padding-right:1rem\" routerLink=\"/volunteer-directory\"><span> Volunteer Directory </span> </a>\n      <a style=\"padding-right:1rem\" routerLink=\"/volunteer-account\"><span> Account </span> </a>\n      <app-notifications></app-notifications>\n  </div>\n</mat-toolbar>\n");

/***/ }),

/***/ "./node_modules/raw-loader/dist/cjs.js!./src/app/user-event/user-event.component.html":
/*!********************************************************************************************!*\
  !*** ./node_modules/raw-loader/dist/cjs.js!./src/app/user-event/user-event.component.html ***!
  \********************************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony default export */ __webpack_exports__["default"] = ("<ng-template #content let-modal>\n  <div class=\"modal-header text-center\">\n    <h4 class=\"modal-title w-100\" id=\"modal-basic-title\">\n      Volunteer's Past and Upcoming Events\n    </h4>\n    <button\n      type=\"button\"\n      class=\"close\"\n      aria-label=\"Close\"\n      (click)=\"modal.dismiss()\"\n    >\n      <span aria-hidden=\"true\">&times;</span>\n    </button>\n  </div>\n  <div class=\"modal-body\">\n    <!-- 2 tabs avec chacune un mat table des events (soit past soit current) -->\n    <mat-tab-group>\n      <mat-tab label=\"Past Events\">\n        <h2 id=\"no_event\" *ngIf=\"pastEventsUser.length == 0\">\n          This volunteer doesn't have any past events!\n        </h2>\n\n        <table class=\"table\" *ngIf=\"pastEventsUser.length != 0\">\n          <thead class=\"thead-dark\">\n            <tr>\n              <th scope=\"col\">Date</th>\n              <th scope=\"col\">Type</th>\n            </tr>\n          </thead>\n          <tbody>\n            <tr *ngFor=\"let event of pastEventsUser\">\n              <td>{{ event.event_date_txt }}</td>\n              <td>{{ formatEventType(event.event_type) }}</td>\n            </tr>\n          </tbody>\n        </table>\n      </mat-tab>\n\n      <mat-tab label=\"Current Events\">\n        <h2 id=\"no_event\" *ngIf=\"currentEventsUser.length == 0\">\n          This volunteer doesn't have any coming events!\n        </h2>\n\n        <table class=\"table\" *ngIf=\"currentEventsUser.length != 0\">\n          <thead class=\"thead-dark\">\n            <tr>\n              <th scope=\"col\">Date</th>\n              <th scope=\"col\"></th>  <!-- Empty columns to space out information -->\n              <th scope=\"col\"></th>\n              <th scope=\"col\">Type</th>\n              <th scope=\"col\"></th>\n              <th scope=\"col\"></th>\n            </tr>\n          </thead>\n          <tbody>\n            <tr *ngFor=\"let event of currentEventsUser\">\n              <td>{{ event.event_date_txt }}</td>\n              <td></td>     <!-- Empty columns to space out information -->\n              <td></td>\n              <td>{{ formatEventType(event.event_type) }}</td>\n              <td></td>\n              <td><button class=\"removeVolBtn\" onclick=\"this.blur()\">\n                <app-remove-user-from-event \n                firstName={{element.first_name}}\n                eventId={{event.id}}\n                userId={{element.uid}}\n                lastName={{element.last_name}}\n                date={{event.event_date_txt}}\n                eventType = {{event.event_type}}\n                (confirmRemove)=\"onRemoveUserFromEvent(event.id)\">\n    </app-remove-user-from-event>\n              </button></td>\n            </tr>\n          </tbody>\n        </table>\n      </mat-tab>\n    </mat-tab-group>\n  </div>\n</ng-template>\n\n<div class=\"modal-body profile\">\n  <table class=\"table\">\n    <tbody>\n      <h4>{{ element.first_name }} {{ element.last_name }}</h4>\n  \n    <input class=\"apple-switch\" \n    id=\"statusCheck\" \n    (click)=\"changeActiveStatus()\" \n    type=\"checkbox\"\n    matTooltip=\"Toggle volunteer's active status\">\n\n    <status *ngIf=\"element.active_status || element.active_status == null\" >Active</status>\n    <status *ngIf=\"element.active_status == false\" >Inactive</status>\n\n      <button\n        mat-menu-item\n        (click)=\"open(content)\"\n        onclick=\"this.blur()\"\n        id=\"historyBtn\"\n      >\n        <mat-icon style=\"margin-left: -10px;\">history</mat-icon>\n        <span>View Events</span>\n      </button>\n\n      <div class=\"editBtn\">\n      <button\n        id=\"editBtn\"\n        mat-menu-item\n        (click)=\"openEditForm()\"\n        onclick=\"this.blur()\"\n      >\n        <mat-icon style=\"margin-left: -10px;\">edit</mat-icon>\n        <span>Edit Profile</span>\n      </button>\n      <div *ngIf=\"displayForm\">\n            <form  \n              name=\"editForm\"\n              class=\"form\"\n              (ngSubmit)=\"onSave()\"\n              *ngIf=\"myForm\"\n              [formGroup]=\"myForm\"\n            >\n              <input\n                value=\"{{ element.email }}\"\n                id=\"editInput1\"\n                email=\"true\"\n                formControlName=\"email\"\n                [(ngModel)]=\"model.email\"\n                required\n              />\n              <div class=\"input-group\">\n              <input\n                value=\"{{ element.address_number }}\"\n                id=\"editInput2\"\n                formControlName=\"address_number\"\n                [(ngModel)]=\"model.address_number\"\n                placeholder=\"Number\"\n                required\n              />\n        \n              <input\n                value=\"{{ element.address_street }}\"\n                id=\"editInput3\"\n                formControlName=\"address_street\"\n                [(ngModel)]=\"model.address_street\"\n                placeholder=\"Street\"\n                required\n              />\n        \n              <input\n                value=\"{{ element.address_city }}\"\n                id=\"editInput4\"\n                formControlName=\"address_city\"\n                [(ngModel)]=\"model.address_city\"\n                placeholder=\"City\"\n                required\n              />\n        \n              <input\n                value=\"{{ element.address_postal_code }}\"\n                id=\"editInput5\"\n                formControlName=\"address_postal_code\"\n                [(ngModel)]=\"model.address_postal_code\"\n                placeholder=\"Postal code\"\n                required\n              />\n            </div>\n        \n              <input \n                [matDatepicker]=\"picker\"\n                [max]=\"today\"\n                id=\"editDate\"\n                formControlName=\"dob\"\n                [(ngModel)]=\"model.dob\"\n                placeholder=\"mm/dd/yyyy\"\n                required\n              />\n              <mat-datepicker-toggle\n                matSuffix\n                [for]=\"picker\"\n                id=\"picker\"\n              ></mat-datepicker-toggle>\n              <mat-datepicker #picker ></mat-datepicker>\n             \n              <input\n                ng-model=\"name\"\n                id=\"editInput6\"\n                value=\"{{ element.phone_number }}\"\n                [(ngModel)]=\"model.phone_number\"\n                formControlName=\"phone_number\"\n                type=\"tel\"\n                required\n              />\n              \n              <div class=\"input-group group2\">\n              <input\n                value=\"{{ element.emergency_contact_name }}\"\n                id=\"editInput7\"\n                [(ngModel)]=\"model.emergency_contact_name\"\n                formControlName=\"emergency_contact_name\"\n                placeholder=\"Contact Name\"\n              />\n        \n              <input\n                value=\"{{ element.emergency_relationship }}\"\n                id=\"editInput8\"\n                formControlName=\"emergency_relationship\"\n                [(ngModel)]=\"model.emergency_relationship\"\n                placeholder=\"Emergency Relationship\"\n              />\n            </div>\n        \n              <input\n                value=\"{{ element.emergency_contact_number }}\"\n                id=\"editInput9\"\n                formControlName=\"emergency_contact_number\"\n                [(ngModel)]=\"model.emergency_contact_number\"\n                type=\"tel\"\n              />\n            </form>\n            <button class=\"button\" mat-menu-item (click)=\"onSave()\" type=\"submit\" id=\"saveBtn\">\n              <mat-icon style=\"margin-left: -8px;\">save</mat-icon>\n              <span>Save</span>\n            </button>\n            </div>\n      </div>\n\n      <tr>\n        <td id=\"colored\">\n          <mat-icon >account_box</mat-icon>\n          <pre>User ID:<text>{{ userId }}</text> </pre>\n        </td>\n      </tr>\n      <tr>\n        <td>\n          <mat-icon>how_to_reg</mat-icon>\n          <pre>Registered Since:<text>{{ element.signup_date }}</text> </pre>\n        </td>\n      </tr>\n      <tr>\n        <td id=\"colored\">\n          <mat-icon>email</mat-icon>\n          <pre>Email:<text *ngIf=\"!displayForm\">{{ element.email }} </text></pre>\n        </td>\n      </tr>\n      <tr>\n        <td >\n          <mat-icon>home</mat-icon>\n          <pre>\nAddress:<text *ngIf=\"!displayForm\">{{element.address_number }} {{element.address_street}}, {{ element.address_city }}, {{ element.address_postal_code }}</text></pre>\n        </td>\n      </tr>\n      <tr>\n        <td id=\"colored\">\n          <mat-icon>cake</mat-icon>\n          <pre>\n Date of Birth:<text *ngIf=\"!displayForm\">{{formatDate(element.dob)}}</text></pre>\n        </td>\n      </tr>\n      <tr>\n        <td>\n          <mat-icon>phone_android</mat-icon>\n          <pre>\nPhone Number:<text *ngIf=\"!displayForm\">{{prettifyNumber(element.phone_number)}}</text></pre>\n        </td>\n      </tr>\n      <tr>\n        <td id=\"colored\">\n          <mat-icon>local_hospital</mat-icon>\n          <pre>\n Emergency Contact:<text *ngIf=\"!displayForm\">{{ emergency(element) }}</text></pre>\n        </td>\n      </tr>\n      <tr>\n        <td>\n          <mat-icon>perm_device_information</mat-icon>\n          <pre>\nEmergency Number:<text *ngIf=\"!displayForm\">{{ prettifyNumber(element.emergency_contact_number) }}</text></pre>\n        </td>\n      </tr>\n    </tbody>\n  </table>\n\n<div class=\"cancellation\">\n  <h5>Cancellations: {{ valid(element.cancellations) }}</h5>\n  <div id=\"scrollable-area\" *ngIf=\"cancelledEventsUser.length != 0\">\n  <table class=\"table\" >\n    <thead class=\"thead-dark\">\n      <tr>\n        <th scope=\"col\">Date </th>\n        <th scope=\"col\">Event Id</th>\n        <th scope=\"col\">Reason of Cancellation</th>\n      </tr>\n    </thead>\n    <tbody>\n      <tr style=\"font-size: 15px;\" *ngFor=\"let event of cancelledEventsUser\">\n        <td>{{ formatEventDate(event.event_id) }}</td>\n        <td>{{ formatEventId(event.event_id) }}</td>\n        <td>{{ event.reason }}</td>\n      </tr>\n    </tbody>\n  </table>\n  </div>\n </div>\n</div>\n\n");

/***/ }),

/***/ "./node_modules/raw-loader/dist/cjs.js!./src/app/user-profile/user-profile.component.html":
/*!************************************************************************************************!*\
  !*** ./node_modules/raw-loader/dist/cjs.js!./src/app/user-profile/user-profile.component.html ***!
  \************************************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony default export */ __webpack_exports__["default"] = ("\n  <app-user-event [userId]=\"id\"></app-user-event>\n");

/***/ }),

/***/ "./node_modules/raw-loader/dist/cjs.js!./src/app/volunteer-directory/volunteer-directory.component.html":
/*!**************************************************************************************************************!*\
  !*** ./node_modules/raw-loader/dist/cjs.js!./src/app/volunteer-directory/volunteer-directory.component.html ***!
  \**************************************************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony default export */ __webpack_exports__["default"] = ("<!-- Page title -->\n<div class=\"page-title\">\n   <h1>Volunteer Directory</h1>\n</div>\n<!-- Search container -->\n<div class=\"container-search\">\n   <mat-form-field class=\"volunteer-search\">\n      <input matInput (keyup)=\"applyFilter($event.target.value)\" placeholder=\"Search\">\n      <mat-icon matSuffix>search</mat-icon>\n   </mat-form-field>\n   <app-new-user></app-new-user>\n</div>\n<!-- Volunteer table -->\n\n<table mat-table\n       [dataSource]=\"dataSource\"\n       multiTemplateDataRows\n       class=\"mat-elevation-z8\">\n   <ng-container matColumnDef=\"{{column}}\" *ngFor=\"let column of displayedColumns\">\n      <th mat-header-cell *matHeaderCellDef>{{prettify(column)}}</th>\n      <td mat-cell *matCellDef=\"let element\">{{element[column]}}</td>\n   </ng-container>\n   <!-- Expanded Element Content - The detail row is made up of this one column that spans across all columns -->\n\n   <ng-container matColumnDef=\"expandedDetail\">\n      <td mat-cell *matCellDef=\"let element\" [attr.colspan]=\"displayedColumns.length\">\n      </td>\n   </ng-container>\n   <tr mat-header-row *matHeaderRowDef=\"displayedColumns\"></tr>\n   <tr mat-row *matRowDef=\"let element; columns: displayedColumns;\"\n       class=\"element-row\"\n       [routerLink]=\"['/volunteer', element.id]\"\n       >\n   </tr>\n   <tr mat-row *matRowDef=\"let row; columns: ['expandedDetail']\" class=\"detail-row\"></tr>\n</table>\n");

/***/ }),

/***/ "./node_modules/raw-loader/dist/cjs.js!./src/app/week-generator/week-generator.component.html":
/*!****************************************************************************************************!*\
  !*** ./node_modules/raw-loader/dist/cjs.js!./src/app/week-generator/week-generator.component.html ***!
  \****************************************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony default export */ __webpack_exports__["default"] = ("<ng-template #addPermanentModal let-modal>\n  <div class=\"modal-header text-center\">\n    <h4 class=\"modal-title w-100\"><i class=\"fa fa-map-marker\"></i>Permanent Volunteer</h4>\n    <button type=\"button\" class=\"close\" aria-label=\"Close\" (click)=\"modal.dismiss()\" #closeModal>\n      <span aria-hidden=\"true\">&times;</span>\n    </button>\n  </div>\n\n  <div class=\"modal-body text-center\">\n\n\n      <form class=\"form\" (ngSubmit)=\"onSubmit()\" [formGroup]=\"addPermanentForm\">\n        <div class=\"form-row mb-12\">\n          <div class=\"form-group col-md-12\" style=\"margin-bottom:1rem;\">\n            Generate new week:\n          </div>\n        </div>\n        <mat-select formControlName=\"startDate\" [(ngModel)]=\"model.startDate\">\n          <mat-option *ngFor=\"let day of threeMondays\" [value]=\"monday\">\n        {{day}}\n        </mat-option>\n      </mat-select>\n        <div class=\"row\">\n          <div class=\"col-2\">Weekday</div>\n          <div class=\"col-1\">Monday</div>\n          <div class=\"col-1\">Tuesday</div>\n          <div class=\"col-1\">Wednesday</div>\n          <div class=\"col-1\">Thursday</div>\n          <div class=\"col-1\">Friday</div>\n          <div class=\"col-1\">Saturday</div>\n          <div class=\"col-1\">Sunday</div>\n        </div>\n        <div class=\"row\">\n          <div class=\"col-2\">\n            Kitchen AM:\n          </div>\n          <div class=\"col-1\">\n            <mat-select formControlName=\"kitamSlots\"  [(ngModel)]=\"model.kitamSlots[0]\">\n              <mat-option [value]=\"0\"> 0 </mat-option>\n              <mat-option [value]=\"1\"> 1 </mat-option>\n              <mat-option [value]=\"2\"> 2 </mat-option>\n              <mat-option [value]=\"3\"> 3 </mat-option>\n              <mat-option [value]=\"4\"> 4 </mat-option>\n            </mat-select>\n        </div>\n        <div class=\"col-1\">\n          <mat-select formControlName=\"kitamSlots\" [(ngModel)]=\"model.kitamSlots[1]\">\n            <mat-option [value]=\"0\"> 0 </mat-option>\n            <mat-option [value]=\"1\"> 1 </mat-option>\n            <mat-option [value]=\"2\"> 2 </mat-option>\n            <mat-option [value]=\"3\"> 3 </mat-option>\n            <mat-option [value]=\"4\"> 4 </mat-option>\n          </mat-select>\n      </div>\n        </div>\n        <div class=\"form-row mb-12\">\n           <div class=\"col-1\">\n             Kitchen AM:\n             <!-- <mat-form-field>\n               <mat-label>Existing Volunteer</mat-label>\n               <mat-select formControlName=\"volunteer\" [(ngModel)]=\"model.volunteer\">\n                 <mat-option disabled>--Select the volunteer--</mat-option>\n                 <mat-option *ngFor=\"let volunteer of volunteers\" [value]=\"[volunteer.key, volunteer.first_name, volunteer.last_name]\"> {{volunteer.first_name}} {{volunteer.last_name}} </mat-option>\n               </mat-select>\n               <mat-error>Required!</mat-error>\n             </mat-form-field> -->\n           </div>\n           <div class=\"form-group col-md-4\">\n             Kitchen PM:\n             <!-- <mat-form-field>\n               <mat-label>Existing Volunteer</mat-label>\n               <mat-select formControlName=\"volunteer\" [(ngModel)]=\"model.volunteer\">\n                 <mat-option disabled>--Select the volunteer--</mat-option>\n                 <mat-option *ngFor=\"let volunteer of volunteers\" [value]=\"[volunteer.key, volunteer.first_name, volunteer.last_name]\"> {{volunteer.first_name}} {{volunteer.last_name}} </mat-option>\n               </mat-select>\n               <mat-error>Required!</mat-error>\n             </mat-form-field> -->\n           </div>\n           <div class=\"form-group col-md-4\">\n             Delivery:\n             <!-- <mat-form-field>\n               <mat-label>Existing Volunteer</mat-label>\n               <mat-select formControlName=\"volunteer\" [(ngModel)]=\"model.volunteer\">\n                 <mat-option disabled>--Select the volunteer--</mat-option>\n                 <mat-option *ngFor=\"let volunteer of volunteers\" [value]=\"[volunteer.key, volunteer.first_name, volunteer.last_name]\"> {{volunteer.first_name}} {{volunteer.last_name}} </mat-option>\n               </mat-select>\n               <mat-error>Required!</mat-error>\n             </mat-form-field> -->\n           </div>\n           <div class=\"form-group col-md-4\">\n             Delivery Driver:\n             <!-- <mat-form-field>\n               <mat-label>Existing Volunteer</mat-label>\n               <mat-select formControlName=\"volunteer\" [(ngModel)]=\"model.volunteer\">\n                 <mat-option disabled>--Select the volunteer--</mat-option>\n                 <mat-option *ngFor=\"let volunteer of volunteers\" [value]=\"[volunteer.key, volunteer.first_name, volunteer.last_name]\"> {{volunteer.first_name}} {{volunteer.last_name}} </mat-option>\n               </mat-select>\n               <mat-error>Required!</mat-error>\n             </mat-form-field> -->\n           </div>\n\n\n           <div class=\"form-group col-md-4\">\n             <mat-form-field>\n               <mat-label>Frequency</mat-label>\n               <mat-select formControlName=\"frequency\" [(ngModel)]=\"model.frequency\">\n                 <mat-option disabled>--Select the frequency--</mat-option>\n                 <mat-option [value]=\"1\"> Weekly </mat-option>\n                 <mat-option [value]=\"2\"> Biweekly </mat-option>\n                 <mat-option [value]=\"3\"> Triweekly </mat-option>\n                 <mat-option [value]=\"4\"> Monthly </mat-option>\n               </mat-select>\n               <mat-error>Required!</mat-error>\n             </mat-form-field>\n           </div>\n           <div class=\"form-group col-md-4\">\n             <mat-form-field>\n               <mat-label>Event Type</mat-label>\n               <mat-select formControlName=\"eventType\" [(ngModel)]=\"model.eventType\">\n                 <mat-option disabled>--Select the event type--</mat-option>\n                 <mat-option [value]=\"'kitam'\"> Kitchen AM </mat-option>\n                 <mat-option [value]=\"'kitpm'\"> Kitchen PM </mat-option>\n                 <mat-option [value]=\"'kitas'\"> Kitchen AM Sat </mat-option>\n                 <mat-option [value]=\"'kitps'\"> Kitchen PM Sat </mat-option>\n                 <mat-option [value]=\"'delds'\"> Delivery Driver Sat </mat-option>\n                 <mat-option [value]=\"'delis'\"> Delivery Sat </mat-option>\n                 <mat-option [value]=\"'deldr'\"> Delivery Driver </mat-option>\n                 <mat-option [value]=\"'deliv'\"> Delivery </mat-option>\n               </mat-select>\n               <mat-error>Required!</mat-error>\n             </mat-form-field>\n           </div>\n           <div class=\"form-group col-md-6\">\n              <mat-form-field>\n                 <mat-label>Start Date</mat-label>\n                 <input matInput [matDatepicker]=\"picker1\" [min]=\"today\" [max]=\"aYearFromNow\" placeholder=\"mm/dd/yyyy\" formControlName=\"startDate\" [(ngModel)]=\"model.startDate\">\n                 <mat-datepicker-toggle matSuffix [for]=\"picker1\"></mat-datepicker-toggle>\n                 <mat-datepicker #picker1></mat-datepicker>\n                 <mat-error *ngIf=\"startDateRequiredError()\">Required!</mat-error>\n              </mat-form-field>\n           </div>\n           <div class=\"form-group col-md-6\">\n              <mat-form-field>\n                 <mat-label>End Date</mat-label>\n                 <input matInput [matDatepicker]=\"picker\" [min]=\"today\" [max]=\"aYearFromNow\" placeholder=\"mm/dd/yyyy\" formControlName=\"endDate\" [(ngModel)]=\"model.endDate\">\n                 <mat-datepicker-toggle matSuffix [for]=\"picker\"></mat-datepicker-toggle>\n                 <mat-datepicker #picker></mat-datepicker>\n                 <mat-error *ngIf=\"endDateRequiredError()\">Required!</mat-error>\n              </mat-form-field>\n           </div>\n        </div>\n      </form>\n      <button type=\"submit\" class=\"btn btn-xl btn-outline-success btn-change-registration-code\"  (click)=\"onSubmit('add')\">Add Permanent Volunteer</button>\n\n\n\n  </div>\n\n\n</ng-template>\n\n<button mat-menu-item (click)=\"open(addPermanentModal)\">\n  <mat-icon>assignment_ind</mat-icon>\n  <span>Generate New Week</span>\n</button>\n");

/***/ }),

/***/ "./node_modules/zone.js/dist/zone-evergreen.js":
/*!*****************************************************!*\
  !*** ./node_modules/zone.js/dist/zone-evergreen.js ***!
  \*****************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

var __WEBPACK_AMD_DEFINE_FACTORY__, __WEBPACK_AMD_DEFINE_RESULT__;/**
* @license Angular v9.1.0-next.4+61.sha-e552591.with-local-changes
* (c) 2010-2020 Google LLC. https://angular.io/
* License: MIT
*/
(function (factory) {
     true ? !(__WEBPACK_AMD_DEFINE_FACTORY__ = (factory),
				__WEBPACK_AMD_DEFINE_RESULT__ = (typeof __WEBPACK_AMD_DEFINE_FACTORY__ === 'function' ?
				(__WEBPACK_AMD_DEFINE_FACTORY__.call(exports, __webpack_require__, exports, module)) :
				__WEBPACK_AMD_DEFINE_FACTORY__),
				__WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__)) :
    undefined;
}((function () { 'use strict';

    /**
     * @license
     * Copyright Google Inc. All Rights Reserved.
     *
     * Use of this source code is governed by an MIT-style license that can be
     * found in the LICENSE file at https://angular.io/license
     */
    const Zone$1 = (function (global) {
        const performance = global['performance'];
        function mark(name) { performance && performance['mark'] && performance['mark'](name); }
        function performanceMeasure(name, label) {
            performance && performance['measure'] && performance['measure'](name, label);
        }
        mark('Zone');
        // Initialize before it's accessed below.
        // __Zone_symbol_prefix global can be used to override the default zone
        // symbol prefix with a custom one if needed.
        const symbolPrefix = global['__Zone_symbol_prefix'] || '__zone_symbol__';
        function __symbol__(name) { return symbolPrefix + name; }
        const checkDuplicate = global[__symbol__('forceDuplicateZoneCheck')] === true;
        if (global['Zone']) {
            // if global['Zone'] already exists (maybe zone.js was already loaded or
            // some other lib also registered a global object named Zone), we may need
            // to throw an error, but sometimes user may not want this error.
            // For example,
            // we have two web pages, page1 includes zone.js, page2 doesn't.
            // and the 1st time user load page1 and page2, everything work fine,
            // but when user load page2 again, error occurs because global['Zone'] already exists.
            // so we add a flag to let user choose whether to throw this error or not.
            // By default, if existing Zone is from zone.js, we will not throw the error.
            if (checkDuplicate || typeof global['Zone'].__symbol__ !== 'function') {
                throw new Error('Zone already loaded.');
            }
            else {
                return global['Zone'];
            }
        }
        class Zone {
            constructor(parent, zoneSpec) {
                this._parent = parent;
                this._name = zoneSpec ? zoneSpec.name || 'unnamed' : '<root>';
                this._properties = zoneSpec && zoneSpec.properties || {};
                this._zoneDelegate =
                    new ZoneDelegate(this, this._parent && this._parent._zoneDelegate, zoneSpec);
            }
            static assertZonePatched() {
                if (global['Promise'] !== patches['ZoneAwarePromise']) {
                    throw new Error('Zone.js has detected that ZoneAwarePromise `(window|global).Promise` ' +
                        'has been overwritten.\n' +
                        'Most likely cause is that a Promise polyfill has been loaded ' +
                        'after Zone.js (Polyfilling Promise api is not necessary when zone.js is loaded. ' +
                        'If you must load one, do so before loading zone.js.)');
                }
            }
            static get root() {
                let zone = Zone.current;
                while (zone.parent) {
                    zone = zone.parent;
                }
                return zone;
            }
            static get current() { return _currentZoneFrame.zone; }
            static get currentTask() { return _currentTask; }
            // tslint:disable-next-line:require-internal-with-underscore
            static __load_patch(name, fn) {
                if (patches.hasOwnProperty(name)) {
                    if (checkDuplicate) {
                        throw Error('Already loaded patch: ' + name);
                    }
                }
                else if (!global['__Zone_disable_' + name]) {
                    const perfName = 'Zone:' + name;
                    mark(perfName);
                    patches[name] = fn(global, Zone, _api);
                    performanceMeasure(perfName, perfName);
                }
            }
            get parent() { return this._parent; }
            get name() { return this._name; }
            get(key) {
                const zone = this.getZoneWith(key);
                if (zone)
                    return zone._properties[key];
            }
            getZoneWith(key) {
                let current = this;
                while (current) {
                    if (current._properties.hasOwnProperty(key)) {
                        return current;
                    }
                    current = current._parent;
                }
                return null;
            }
            fork(zoneSpec) {
                if (!zoneSpec)
                    throw new Error('ZoneSpec required!');
                return this._zoneDelegate.fork(this, zoneSpec);
            }
            wrap(callback, source) {
                if (typeof callback !== 'function') {
                    throw new Error('Expecting function got: ' + callback);
                }
                const _callback = this._zoneDelegate.intercept(this, callback, source);
                const zone = this;
                return function () {
                    return zone.runGuarded(_callback, this, arguments, source);
                };
            }
            run(callback, applyThis, applyArgs, source) {
                _currentZoneFrame = { parent: _currentZoneFrame, zone: this };
                try {
                    return this._zoneDelegate.invoke(this, callback, applyThis, applyArgs, source);
                }
                finally {
                    _currentZoneFrame = _currentZoneFrame.parent;
                }
            }
            runGuarded(callback, applyThis = null, applyArgs, source) {
                _currentZoneFrame = { parent: _currentZoneFrame, zone: this };
                try {
                    try {
                        return this._zoneDelegate.invoke(this, callback, applyThis, applyArgs, source);
                    }
                    catch (error) {
                        if (this._zoneDelegate.handleError(this, error)) {
                            throw error;
                        }
                    }
                }
                finally {
                    _currentZoneFrame = _currentZoneFrame.parent;
                }
            }
            runTask(task, applyThis, applyArgs) {
                if (task.zone != this) {
                    throw new Error('A task can only be run in the zone of creation! (Creation: ' +
                        (task.zone || NO_ZONE).name + '; Execution: ' + this.name + ')');
                }
                // https://github.com/angular/zone.js/issues/778, sometimes eventTask
                // will run in notScheduled(canceled) state, we should not try to
                // run such kind of task but just return
                if (task.state === notScheduled && (task.type === eventTask || task.type === macroTask)) {
                    return;
                }
                const reEntryGuard = task.state != running;
                reEntryGuard && task._transitionTo(running, scheduled);
                task.runCount++;
                const previousTask = _currentTask;
                _currentTask = task;
                _currentZoneFrame = { parent: _currentZoneFrame, zone: this };
                try {
                    if (task.type == macroTask && task.data && !task.data.isPeriodic) {
                        task.cancelFn = undefined;
                    }
                    try {
                        return this._zoneDelegate.invokeTask(this, task, applyThis, applyArgs);
                    }
                    catch (error) {
                        if (this._zoneDelegate.handleError(this, error)) {
                            throw error;
                        }
                    }
                }
                finally {
                    // if the task's state is notScheduled or unknown, then it has already been cancelled
                    // we should not reset the state to scheduled
                    if (task.state !== notScheduled && task.state !== unknown) {
                        if (task.type == eventTask || (task.data && task.data.isPeriodic)) {
                            reEntryGuard && task._transitionTo(scheduled, running);
                        }
                        else {
                            task.runCount = 0;
                            this._updateTaskCount(task, -1);
                            reEntryGuard &&
                                task._transitionTo(notScheduled, running, notScheduled);
                        }
                    }
                    _currentZoneFrame = _currentZoneFrame.parent;
                    _currentTask = previousTask;
                }
            }
            scheduleTask(task) {
                if (task.zone && task.zone !== this) {
                    // check if the task was rescheduled, the newZone
                    // should not be the children of the original zone
                    let newZone = this;
                    while (newZone) {
                        if (newZone === task.zone) {
                            throw Error(`can not reschedule task to ${this.name} which is descendants of the original zone ${task.zone.name}`);
                        }
                        newZone = newZone.parent;
                    }
                }
                task._transitionTo(scheduling, notScheduled);
                const zoneDelegates = [];
                task._zoneDelegates = zoneDelegates;
                task._zone = this;
                try {
                    task = this._zoneDelegate.scheduleTask(this, task);
                }
                catch (err) {
                    // should set task's state to unknown when scheduleTask throw error
                    // because the err may from reschedule, so the fromState maybe notScheduled
                    task._transitionTo(unknown, scheduling, notScheduled);
                    // TODO: @JiaLiPassion, should we check the result from handleError?
                    this._zoneDelegate.handleError(this, err);
                    throw err;
                }
                if (task._zoneDelegates === zoneDelegates) {
                    // we have to check because internally the delegate can reschedule the task.
                    this._updateTaskCount(task, 1);
                }
                if (task.state == scheduling) {
                    task._transitionTo(scheduled, scheduling);
                }
                return task;
            }
            scheduleMicroTask(source, callback, data, customSchedule) {
                return this.scheduleTask(new ZoneTask(microTask, source, callback, data, customSchedule, undefined));
            }
            scheduleMacroTask(source, callback, data, customSchedule, customCancel) {
                return this.scheduleTask(new ZoneTask(macroTask, source, callback, data, customSchedule, customCancel));
            }
            scheduleEventTask(source, callback, data, customSchedule, customCancel) {
                return this.scheduleTask(new ZoneTask(eventTask, source, callback, data, customSchedule, customCancel));
            }
            cancelTask(task) {
                if (task.zone != this)
                    throw new Error('A task can only be cancelled in the zone of creation! (Creation: ' +
                        (task.zone || NO_ZONE).name + '; Execution: ' + this.name + ')');
                task._transitionTo(canceling, scheduled, running);
                try {
                    this._zoneDelegate.cancelTask(this, task);
                }
                catch (err) {
                    // if error occurs when cancelTask, transit the state to unknown
                    task._transitionTo(unknown, canceling);
                    this._zoneDelegate.handleError(this, err);
                    throw err;
                }
                this._updateTaskCount(task, -1);
                task._transitionTo(notScheduled, canceling);
                task.runCount = 0;
                return task;
            }
            _updateTaskCount(task, count) {
                const zoneDelegates = task._zoneDelegates;
                if (count == -1) {
                    task._zoneDelegates = null;
                }
                for (let i = 0; i < zoneDelegates.length; i++) {
                    zoneDelegates[i]._updateTaskCount(task.type, count);
                }
            }
        }
        // tslint:disable-next-line:require-internal-with-underscore
        Zone.__symbol__ = __symbol__;
        const DELEGATE_ZS = {
            name: '',
            onHasTask: (delegate, _, target, hasTaskState) => delegate.hasTask(target, hasTaskState),
            onScheduleTask: (delegate, _, target, task) => delegate.scheduleTask(target, task),
            onInvokeTask: (delegate, _, target, task, applyThis, applyArgs) => delegate.invokeTask(target, task, applyThis, applyArgs),
            onCancelTask: (delegate, _, target, task) => delegate.cancelTask(target, task)
        };
        class ZoneDelegate {
            constructor(zone, parentDelegate, zoneSpec) {
                this._taskCounts = { 'microTask': 0, 'macroTask': 0, 'eventTask': 0 };
                this.zone = zone;
                this._parentDelegate = parentDelegate;
                this._forkZS =
                    zoneSpec && (zoneSpec && zoneSpec.onFork ? zoneSpec : parentDelegate._forkZS);
                this._forkDlgt = zoneSpec && (zoneSpec.onFork ? parentDelegate : parentDelegate._forkDlgt);
                this._forkCurrZone =
                    zoneSpec && (zoneSpec.onFork ? this.zone : parentDelegate._forkCurrZone);
                this._interceptZS =
                    zoneSpec && (zoneSpec.onIntercept ? zoneSpec : parentDelegate._interceptZS);
                this._interceptDlgt =
                    zoneSpec && (zoneSpec.onIntercept ? parentDelegate : parentDelegate._interceptDlgt);
                this._interceptCurrZone =
                    zoneSpec && (zoneSpec.onIntercept ? this.zone : parentDelegate._interceptCurrZone);
                this._invokeZS = zoneSpec && (zoneSpec.onInvoke ? zoneSpec : parentDelegate._invokeZS);
                this._invokeDlgt =
                    zoneSpec && (zoneSpec.onInvoke ? parentDelegate : parentDelegate._invokeDlgt);
                this._invokeCurrZone =
                    zoneSpec && (zoneSpec.onInvoke ? this.zone : parentDelegate._invokeCurrZone);
                this._handleErrorZS =
                    zoneSpec && (zoneSpec.onHandleError ? zoneSpec : parentDelegate._handleErrorZS);
                this._handleErrorDlgt = zoneSpec &&
                    (zoneSpec.onHandleError ? parentDelegate : parentDelegate._handleErrorDlgt);
                this._handleErrorCurrZone =
                    zoneSpec && (zoneSpec.onHandleError ? this.zone : parentDelegate._handleErrorCurrZone);
                this._scheduleTaskZS =
                    zoneSpec && (zoneSpec.onScheduleTask ? zoneSpec : parentDelegate._scheduleTaskZS);
                this._scheduleTaskDlgt = zoneSpec &&
                    (zoneSpec.onScheduleTask ? parentDelegate : parentDelegate._scheduleTaskDlgt);
                this._scheduleTaskCurrZone = zoneSpec &&
                    (zoneSpec.onScheduleTask ? this.zone : parentDelegate._scheduleTaskCurrZone);
                this._invokeTaskZS =
                    zoneSpec && (zoneSpec.onInvokeTask ? zoneSpec : parentDelegate._invokeTaskZS);
                this._invokeTaskDlgt =
                    zoneSpec && (zoneSpec.onInvokeTask ? parentDelegate : parentDelegate._invokeTaskDlgt);
                this._invokeTaskCurrZone =
                    zoneSpec && (zoneSpec.onInvokeTask ? this.zone : parentDelegate._invokeTaskCurrZone);
                this._cancelTaskZS =
                    zoneSpec && (zoneSpec.onCancelTask ? zoneSpec : parentDelegate._cancelTaskZS);
                this._cancelTaskDlgt =
                    zoneSpec && (zoneSpec.onCancelTask ? parentDelegate : parentDelegate._cancelTaskDlgt);
                this._cancelTaskCurrZone =
                    zoneSpec && (zoneSpec.onCancelTask ? this.zone : parentDelegate._cancelTaskCurrZone);
                this._hasTaskZS = null;
                this._hasTaskDlgt = null;
                this._hasTaskDlgtOwner = null;
                this._hasTaskCurrZone = null;
                const zoneSpecHasTask = zoneSpec && zoneSpec.onHasTask;
                const parentHasTask = parentDelegate && parentDelegate._hasTaskZS;
                if (zoneSpecHasTask || parentHasTask) {
                    // If we need to report hasTask, than this ZS needs to do ref counting on tasks. In such
                    // a case all task related interceptors must go through this ZD. We can't short circuit it.
                    this._hasTaskZS = zoneSpecHasTask ? zoneSpec : DELEGATE_ZS;
                    this._hasTaskDlgt = parentDelegate;
                    this._hasTaskDlgtOwner = this;
                    this._hasTaskCurrZone = zone;
                    if (!zoneSpec.onScheduleTask) {
                        this._scheduleTaskZS = DELEGATE_ZS;
                        this._scheduleTaskDlgt = parentDelegate;
                        this._scheduleTaskCurrZone = this.zone;
                    }
                    if (!zoneSpec.onInvokeTask) {
                        this._invokeTaskZS = DELEGATE_ZS;
                        this._invokeTaskDlgt = parentDelegate;
                        this._invokeTaskCurrZone = this.zone;
                    }
                    if (!zoneSpec.onCancelTask) {
                        this._cancelTaskZS = DELEGATE_ZS;
                        this._cancelTaskDlgt = parentDelegate;
                        this._cancelTaskCurrZone = this.zone;
                    }
                }
            }
            fork(targetZone, zoneSpec) {
                return this._forkZS ?
                    this._forkZS.onFork(this._forkDlgt, this.zone, targetZone, zoneSpec) :
                    new Zone(targetZone, zoneSpec);
            }
            intercept(targetZone, callback, source) {
                return this._interceptZS ?
                    this._interceptZS.onIntercept(this._interceptDlgt, this._interceptCurrZone, targetZone, callback, source) :
                    callback;
            }
            invoke(targetZone, callback, applyThis, applyArgs, source) {
                return this._invokeZS ?
                    this._invokeZS.onInvoke(this._invokeDlgt, this._invokeCurrZone, targetZone, callback, applyThis, applyArgs, source) :
                    callback.apply(applyThis, applyArgs);
            }
            handleError(targetZone, error) {
                return this._handleErrorZS ?
                    this._handleErrorZS.onHandleError(this._handleErrorDlgt, this._handleErrorCurrZone, targetZone, error) :
                    true;
            }
            scheduleTask(targetZone, task) {
                let returnTask = task;
                if (this._scheduleTaskZS) {
                    if (this._hasTaskZS) {
                        returnTask._zoneDelegates.push(this._hasTaskDlgtOwner);
                    }
                    // clang-format off
                    returnTask = this._scheduleTaskZS.onScheduleTask(this._scheduleTaskDlgt, this._scheduleTaskCurrZone, targetZone, task);
                    // clang-format on
                    if (!returnTask)
                        returnTask = task;
                }
                else {
                    if (task.scheduleFn) {
                        task.scheduleFn(task);
                    }
                    else if (task.type == microTask) {
                        scheduleMicroTask(task);
                    }
                    else {
                        throw new Error('Task is missing scheduleFn.');
                    }
                }
                return returnTask;
            }
            invokeTask(targetZone, task, applyThis, applyArgs) {
                return this._invokeTaskZS ?
                    this._invokeTaskZS.onInvokeTask(this._invokeTaskDlgt, this._invokeTaskCurrZone, targetZone, task, applyThis, applyArgs) :
                    task.callback.apply(applyThis, applyArgs);
            }
            cancelTask(targetZone, task) {
                let value;
                if (this._cancelTaskZS) {
                    value = this._cancelTaskZS.onCancelTask(this._cancelTaskDlgt, this._cancelTaskCurrZone, targetZone, task);
                }
                else {
                    if (!task.cancelFn) {
                        throw Error('Task is not cancelable');
                    }
                    value = task.cancelFn(task);
                }
                return value;
            }
            hasTask(targetZone, isEmpty) {
                // hasTask should not throw error so other ZoneDelegate
                // can still trigger hasTask callback
                try {
                    this._hasTaskZS &&
                        this._hasTaskZS.onHasTask(this._hasTaskDlgt, this._hasTaskCurrZone, targetZone, isEmpty);
                }
                catch (err) {
                    this.handleError(targetZone, err);
                }
            }
            // tslint:disable-next-line:require-internal-with-underscore
            _updateTaskCount(type, count) {
                const counts = this._taskCounts;
                const prev = counts[type];
                const next = counts[type] = prev + count;
                if (next < 0) {
                    throw new Error('More tasks executed then were scheduled.');
                }
                if (prev == 0 || next == 0) {
                    const isEmpty = {
                        microTask: counts['microTask'] > 0,
                        macroTask: counts['macroTask'] > 0,
                        eventTask: counts['eventTask'] > 0,
                        change: type
                    };
                    this.hasTask(this.zone, isEmpty);
                }
            }
        }
        class ZoneTask {
            constructor(type, source, callback, options, scheduleFn, cancelFn) {
                // tslint:disable-next-line:require-internal-with-underscore
                this._zone = null;
                this.runCount = 0;
                // tslint:disable-next-line:require-internal-with-underscore
                this._zoneDelegates = null;
                // tslint:disable-next-line:require-internal-with-underscore
                this._state = 'notScheduled';
                this.type = type;
                this.source = source;
                this.data = options;
                this.scheduleFn = scheduleFn;
                this.cancelFn = cancelFn;
                if (!callback) {
                    throw new Error('callback is not defined');
                }
                this.callback = callback;
                const self = this;
                // TODO: @JiaLiPassion options should have interface
                if (type === eventTask && options && options.useG) {
                    this.invoke = ZoneTask.invokeTask;
                }
                else {
                    this.invoke = function () {
                        return ZoneTask.invokeTask.call(global, self, this, arguments);
                    };
                }
            }
            static invokeTask(task, target, args) {
                if (!task) {
                    task = this;
                }
                _numberOfNestedTaskFrames++;
                try {
                    task.runCount++;
                    return task.zone.runTask(task, target, args);
                }
                finally {
                    if (_numberOfNestedTaskFrames == 1) {
                        drainMicroTaskQueue();
                    }
                    _numberOfNestedTaskFrames--;
                }
            }
            get zone() { return this._zone; }
            get state() { return this._state; }
            cancelScheduleRequest() { this._transitionTo(notScheduled, scheduling); }
            // tslint:disable-next-line:require-internal-with-underscore
            _transitionTo(toState, fromState1, fromState2) {
                if (this._state === fromState1 || this._state === fromState2) {
                    this._state = toState;
                    if (toState == notScheduled) {
                        this._zoneDelegates = null;
                    }
                }
                else {
                    throw new Error(`${this.type} '${this.source}': can not transition to '${toState}', expecting state '${fromState1}'${fromState2 ? ' or \'' + fromState2 + '\'' : ''}, was '${this._state}'.`);
                }
            }
            toString() {
                if (this.data && typeof this.data.handleId !== 'undefined') {
                    return this.data.handleId.toString();
                }
                else {
                    return Object.prototype.toString.call(this);
                }
            }
            // add toJSON method to prevent cyclic error when
            // call JSON.stringify(zoneTask)
            toJSON() {
                return {
                    type: this.type,
                    state: this.state,
                    source: this.source,
                    zone: this.zone.name,
                    runCount: this.runCount
                };
            }
        }
        //////////////////////////////////////////////////////
        //////////////////////////////////////////////////////
        ///  MICROTASK QUEUE
        //////////////////////////////////////////////////////
        //////////////////////////////////////////////////////
        const symbolSetTimeout = __symbol__('setTimeout');
        const symbolPromise = __symbol__('Promise');
        const symbolThen = __symbol__('then');
        let _microTaskQueue = [];
        let _isDrainingMicrotaskQueue = false;
        let nativeMicroTaskQueuePromise;
        function scheduleMicroTask(task) {
            // if we are not running in any task, and there has not been anything scheduled
            // we must bootstrap the initial task creation by manually scheduling the drain
            if (_numberOfNestedTaskFrames === 0 && _microTaskQueue.length === 0) {
                // We are not running in Task, so we need to kickstart the microtask queue.
                if (!nativeMicroTaskQueuePromise) {
                    if (global[symbolPromise]) {
                        nativeMicroTaskQueuePromise = global[symbolPromise].resolve(0);
                    }
                }
                if (nativeMicroTaskQueuePromise) {
                    let nativeThen = nativeMicroTaskQueuePromise[symbolThen];
                    if (!nativeThen) {
                        // native Promise is not patchable, we need to use `then` directly
                        // issue 1078
                        nativeThen = nativeMicroTaskQueuePromise['then'];
                    }
                    nativeThen.call(nativeMicroTaskQueuePromise, drainMicroTaskQueue);
                }
                else {
                    global[symbolSetTimeout](drainMicroTaskQueue, 0);
                }
            }
            task && _microTaskQueue.push(task);
        }
        function drainMicroTaskQueue() {
            if (!_isDrainingMicrotaskQueue) {
                _isDrainingMicrotaskQueue = true;
                while (_microTaskQueue.length) {
                    const queue = _microTaskQueue;
                    _microTaskQueue = [];
                    for (let i = 0; i < queue.length; i++) {
                        const task = queue[i];
                        try {
                            task.zone.runTask(task, null, null);
                        }
                        catch (error) {
                            _api.onUnhandledError(error);
                        }
                    }
                }
                _api.microtaskDrainDone();
                _isDrainingMicrotaskQueue = false;
            }
        }
        //////////////////////////////////////////////////////
        //////////////////////////////////////////////////////
        ///  BOOTSTRAP
        //////////////////////////////////////////////////////
        //////////////////////////////////////////////////////
        const NO_ZONE = { name: 'NO ZONE' };
        const notScheduled = 'notScheduled', scheduling = 'scheduling', scheduled = 'scheduled', running = 'running', canceling = 'canceling', unknown = 'unknown';
        const microTask = 'microTask', macroTask = 'macroTask', eventTask = 'eventTask';
        const patches = {};
        const _api = {
            symbol: __symbol__,
            currentZoneFrame: () => _currentZoneFrame,
            onUnhandledError: noop,
            microtaskDrainDone: noop,
            scheduleMicroTask: scheduleMicroTask,
            showUncaughtError: () => !Zone[__symbol__('ignoreConsoleErrorUncaughtError')],
            patchEventTarget: () => [],
            patchOnProperties: noop,
            patchMethod: () => noop,
            bindArguments: () => [],
            patchThen: () => noop,
            patchMacroTask: () => noop,
            setNativePromise: (NativePromise) => {
                // sometimes NativePromise.resolve static function
                // is not ready yet, (such as core-js/es6.promise)
                // so we need to check here.
                if (NativePromise && typeof NativePromise.resolve === 'function') {
                    nativeMicroTaskQueuePromise = NativePromise.resolve(0);
                }
            },
            patchEventPrototype: () => noop,
            isIEOrEdge: () => false,
            getGlobalObjects: () => undefined,
            ObjectDefineProperty: () => noop,
            ObjectGetOwnPropertyDescriptor: () => undefined,
            ObjectCreate: () => undefined,
            ArraySlice: () => [],
            patchClass: () => noop,
            wrapWithCurrentZone: () => noop,
            filterProperties: () => [],
            attachOriginToPatched: () => noop,
            _redefineProperty: () => noop,
            patchCallbacks: () => noop
        };
        let _currentZoneFrame = { parent: null, zone: new Zone(null, null) };
        let _currentTask = null;
        let _numberOfNestedTaskFrames = 0;
        function noop() { }
        performanceMeasure('Zone', 'Zone');
        return global['Zone'] = Zone;
    })(typeof window !== 'undefined' && window || typeof self !== 'undefined' && self || global);

    /**
     * @license
     * Copyright Google Inc. All Rights Reserved.
     *
     * Use of this source code is governed by an MIT-style license that can be
     * found in the LICENSE file at https://angular.io/license
     */
    Zone.__load_patch('ZoneAwarePromise', (global, Zone, api) => {
        const ObjectGetOwnPropertyDescriptor = Object.getOwnPropertyDescriptor;
        const ObjectDefineProperty = Object.defineProperty;
        function readableObjectToString(obj) {
            if (obj && obj.toString === Object.prototype.toString) {
                const className = obj.constructor && obj.constructor.name;
                return (className ? className : '') + ': ' + JSON.stringify(obj);
            }
            return obj ? obj.toString() : Object.prototype.toString.call(obj);
        }
        const __symbol__ = api.symbol;
        const _uncaughtPromiseErrors = [];
        const isDisableWrappingUncaughtPromiseRejection = global[__symbol__('DISABLE_WRAPPING_UNCAUGHT_PROMISE_REJECTION')] === true;
        const symbolPromise = __symbol__('Promise');
        const symbolThen = __symbol__('then');
        const creationTrace = '__creationTrace__';
        api.onUnhandledError = (e) => {
            if (api.showUncaughtError()) {
                const rejection = e && e.rejection;
                if (rejection) {
                    console.error('Unhandled Promise rejection:', rejection instanceof Error ? rejection.message : rejection, '; Zone:', e.zone.name, '; Task:', e.task && e.task.source, '; Value:', rejection, rejection instanceof Error ? rejection.stack : undefined);
                }
                else {
                    console.error(e);
                }
            }
        };
        api.microtaskDrainDone = () => {
            while (_uncaughtPromiseErrors.length) {
                const uncaughtPromiseError = _uncaughtPromiseErrors.shift();
                try {
                    uncaughtPromiseError.zone.runGuarded(() => { throw uncaughtPromiseError; });
                }
                catch (error) {
                    handleUnhandledRejection(error);
                }
            }
        };
        const UNHANDLED_PROMISE_REJECTION_HANDLER_SYMBOL = __symbol__('unhandledPromiseRejectionHandler');
        function handleUnhandledRejection(e) {
            api.onUnhandledError(e);
            try {
                const handler = Zone[UNHANDLED_PROMISE_REJECTION_HANDLER_SYMBOL];
                if (typeof handler === 'function') {
                    handler.call(this, e);
                }
            }
            catch (err) {
            }
        }
        function isThenable(value) { return value && value.then; }
        function forwardResolution(value) { return value; }
        function forwardRejection(rejection) { return ZoneAwarePromise.reject(rejection); }
        const symbolState = __symbol__('state');
        const symbolValue = __symbol__('value');
        const symbolFinally = __symbol__('finally');
        const symbolParentPromiseValue = __symbol__('parentPromiseValue');
        const symbolParentPromiseState = __symbol__('parentPromiseState');
        const source = 'Promise.then';
        const UNRESOLVED = null;
        const RESOLVED = true;
        const REJECTED = false;
        const REJECTED_NO_CATCH = 0;
        function makeResolver(promise, state) {
            return (v) => {
                try {
                    resolvePromise(promise, state, v);
                }
                catch (err) {
                    resolvePromise(promise, false, err);
                }
                // Do not return value or you will break the Promise spec.
            };
        }
        const once = function () {
            let wasCalled = false;
            return function wrapper(wrappedFunction) {
                return function () {
                    if (wasCalled) {
                        return;
                    }
                    wasCalled = true;
                    wrappedFunction.apply(null, arguments);
                };
            };
        };
        const TYPE_ERROR = 'Promise resolved with itself';
        const CURRENT_TASK_TRACE_SYMBOL = __symbol__('currentTaskTrace');
        // Promise Resolution
        function resolvePromise(promise, state, value) {
            const onceWrapper = once();
            if (promise === value) {
                throw new TypeError(TYPE_ERROR);
            }
            if (promise[symbolState] === UNRESOLVED) {
                // should only get value.then once based on promise spec.
                let then = null;
                try {
                    if (typeof value === 'object' || typeof value === 'function') {
                        then = value && value.then;
                    }
                }
                catch (err) {
                    onceWrapper(() => { resolvePromise(promise, false, err); })();
                    return promise;
                }
                // if (value instanceof ZoneAwarePromise) {
                if (state !== REJECTED && value instanceof ZoneAwarePromise &&
                    value.hasOwnProperty(symbolState) && value.hasOwnProperty(symbolValue) &&
                    value[symbolState] !== UNRESOLVED) {
                    clearRejectedNoCatch(value);
                    resolvePromise(promise, value[symbolState], value[symbolValue]);
                }
                else if (state !== REJECTED && typeof then === 'function') {
                    try {
                        then.call(value, onceWrapper(makeResolver(promise, state)), onceWrapper(makeResolver(promise, false)));
                    }
                    catch (err) {
                        onceWrapper(() => { resolvePromise(promise, false, err); })();
                    }
                }
                else {
                    promise[symbolState] = state;
                    const queue = promise[symbolValue];
                    promise[symbolValue] = value;
                    if (promise[symbolFinally] === symbolFinally) {
                        // the promise is generated by Promise.prototype.finally
                        if (state === RESOLVED) {
                            // the state is resolved, should ignore the value
                            // and use parent promise value
                            promise[symbolState] = promise[symbolParentPromiseState];
                            promise[symbolValue] = promise[symbolParentPromiseValue];
                        }
                    }
                    // record task information in value when error occurs, so we can
                    // do some additional work such as render longStackTrace
                    if (state === REJECTED && value instanceof Error) {
                        // check if longStackTraceZone is here
                        const trace = Zone.currentTask && Zone.currentTask.data &&
                            Zone.currentTask.data[creationTrace];
                        if (trace) {
                            // only keep the long stack trace into error when in longStackTraceZone
                            ObjectDefineProperty(value, CURRENT_TASK_TRACE_SYMBOL, { configurable: true, enumerable: false, writable: true, value: trace });
                        }
                    }
                    for (let i = 0; i < queue.length;) {
                        scheduleResolveOrReject(promise, queue[i++], queue[i++], queue[i++], queue[i++]);
                    }
                    if (queue.length == 0 && state == REJECTED) {
                        promise[symbolState] = REJECTED_NO_CATCH;
                        let uncaughtPromiseError = value;
                        if (!isDisableWrappingUncaughtPromiseRejection) {
                            // If disable wrapping uncaught promise reject
                            // and the rejected value is an Error object,
                            // use the value instead of wrapping it.
                            try {
                                // Here we throws a new Error to print more readable error log
                                // and if the value is not an error, zone.js builds an `Error`
                                // Object here to attach the stack information.
                                throw new Error('Uncaught (in promise): ' + readableObjectToString(value) +
                                    (value && value.stack ? '\n' + value.stack : ''));
                            }
                            catch (err) {
                                uncaughtPromiseError = err;
                            }
                        }
                        uncaughtPromiseError.rejection = value;
                        uncaughtPromiseError.promise = promise;
                        uncaughtPromiseError.zone = Zone.current;
                        uncaughtPromiseError.task = Zone.currentTask;
                        _uncaughtPromiseErrors.push(uncaughtPromiseError);
                        api.scheduleMicroTask(); // to make sure that it is running
                    }
                }
            }
            // Resolving an already resolved promise is a noop.
            return promise;
        }
        const REJECTION_HANDLED_HANDLER = __symbol__('rejectionHandledHandler');
        function clearRejectedNoCatch(promise) {
            if (promise[symbolState] === REJECTED_NO_CATCH) {
                // if the promise is rejected no catch status
                // and queue.length > 0, means there is a error handler
                // here to handle the rejected promise, we should trigger
                // windows.rejectionhandled eventHandler or nodejs rejectionHandled
                // eventHandler
                try {
                    const handler = Zone[REJECTION_HANDLED_HANDLER];
                    if (handler && typeof handler === 'function') {
                        handler.call(this, { rejection: promise[symbolValue], promise: promise });
                    }
                }
                catch (err) {
                }
                promise[symbolState] = REJECTED;
                for (let i = 0; i < _uncaughtPromiseErrors.length; i++) {
                    if (promise === _uncaughtPromiseErrors[i].promise) {
                        _uncaughtPromiseErrors.splice(i, 1);
                    }
                }
            }
        }
        function scheduleResolveOrReject(promise, zone, chainPromise, onFulfilled, onRejected) {
            clearRejectedNoCatch(promise);
            const promiseState = promise[symbolState];
            const delegate = promiseState ?
                (typeof onFulfilled === 'function') ? onFulfilled : forwardResolution :
                (typeof onRejected === 'function') ? onRejected : forwardRejection;
            zone.scheduleMicroTask(source, () => {
                try {
                    const parentPromiseValue = promise[symbolValue];
                    const isFinallyPromise = !!chainPromise && symbolFinally === chainPromise[symbolFinally];
                    if (isFinallyPromise) {
                        // if the promise is generated from finally call, keep parent promise's state and value
                        chainPromise[symbolParentPromiseValue] = parentPromiseValue;
                        chainPromise[symbolParentPromiseState] = promiseState;
                    }
                    // should not pass value to finally callback
                    const value = zone.run(delegate, undefined, isFinallyPromise && delegate !== forwardRejection && delegate !== forwardResolution ?
                        [] :
                        [parentPromiseValue]);
                    resolvePromise(chainPromise, true, value);
                }
                catch (error) {
                    // if error occurs, should always return this error
                    resolvePromise(chainPromise, false, error);
                }
            }, chainPromise);
        }
        const ZONE_AWARE_PROMISE_TO_STRING = 'function ZoneAwarePromise() { [native code] }';
        const noop = function () { };
        class ZoneAwarePromise {
            static toString() { return ZONE_AWARE_PROMISE_TO_STRING; }
            static resolve(value) {
                return resolvePromise(new this(null), RESOLVED, value);
            }
            static reject(error) {
                return resolvePromise(new this(null), REJECTED, error);
            }
            static race(values) {
                let resolve;
                let reject;
                let promise = new this((res, rej) => {
                    resolve = res;
                    reject = rej;
                });
                function onResolve(value) { resolve(value); }
                function onReject(error) { reject(error); }
                for (let value of values) {
                    if (!isThenable(value)) {
                        value = this.resolve(value);
                    }
                    value.then(onResolve, onReject);
                }
                return promise;
            }
            static all(values) { return ZoneAwarePromise.allWithCallback(values); }
            static allSettled(values) {
                const P = this && this.prototype instanceof ZoneAwarePromise ? this : ZoneAwarePromise;
                return P.allWithCallback(values, {
                    thenCallback: (value) => ({ status: 'fulfilled', value }),
                    errorCallback: (err) => ({ status: 'rejected', reason: err })
                });
            }
            static allWithCallback(values, callback) {
                let resolve;
                let reject;
                let promise = new this((res, rej) => {
                    resolve = res;
                    reject = rej;
                });
                // Start at 2 to prevent prematurely resolving if .then is called immediately.
                let unresolvedCount = 2;
                let valueIndex = 0;
                const resolvedValues = [];
                for (let value of values) {
                    if (!isThenable(value)) {
                        value = this.resolve(value);
                    }
                    const curValueIndex = valueIndex;
                    try {
                        value.then((value) => {
                            resolvedValues[curValueIndex] = callback ? callback.thenCallback(value) : value;
                            unresolvedCount--;
                            if (unresolvedCount === 0) {
                                resolve(resolvedValues);
                            }
                        }, (err) => {
                            if (!callback) {
                                reject(err);
                            }
                            else {
                                resolvedValues[curValueIndex] = callback.errorCallback(err);
                                unresolvedCount--;
                                if (unresolvedCount === 0) {
                                    resolve(resolvedValues);
                                }
                            }
                        });
                    }
                    catch (thenErr) {
                        reject(thenErr);
                    }
                    unresolvedCount++;
                    valueIndex++;
                }
                // Make the unresolvedCount zero-based again.
                unresolvedCount -= 2;
                if (unresolvedCount === 0) {
                    resolve(resolvedValues);
                }
                return promise;
            }
            constructor(executor) {
                const promise = this;
                if (!(promise instanceof ZoneAwarePromise)) {
                    throw new Error('Must be an instanceof Promise.');
                }
                promise[symbolState] = UNRESOLVED;
                promise[symbolValue] = []; // queue;
                try {
                    executor && executor(makeResolver(promise, RESOLVED), makeResolver(promise, REJECTED));
                }
                catch (error) {
                    resolvePromise(promise, false, error);
                }
            }
            get [Symbol.toStringTag]() { return 'Promise'; }
            get [Symbol.species]() { return ZoneAwarePromise; }
            then(onFulfilled, onRejected) {
                let C = this.constructor[Symbol.species];
                if (!C || typeof C !== 'function') {
                    C = this.constructor || ZoneAwarePromise;
                }
                const chainPromise = new C(noop);
                const zone = Zone.current;
                if (this[symbolState] == UNRESOLVED) {
                    this[symbolValue].push(zone, chainPromise, onFulfilled, onRejected);
                }
                else {
                    scheduleResolveOrReject(this, zone, chainPromise, onFulfilled, onRejected);
                }
                return chainPromise;
            }
            catch(onRejected) {
                return this.then(null, onRejected);
            }
            finally(onFinally) {
                let C = this.constructor[Symbol.species];
                if (!C || typeof C !== 'function') {
                    C = ZoneAwarePromise;
                }
                const chainPromise = new C(noop);
                chainPromise[symbolFinally] = symbolFinally;
                const zone = Zone.current;
                if (this[symbolState] == UNRESOLVED) {
                    this[symbolValue].push(zone, chainPromise, onFinally, onFinally);
                }
                else {
                    scheduleResolveOrReject(this, zone, chainPromise, onFinally, onFinally);
                }
                return chainPromise;
            }
        }
        // Protect against aggressive optimizers dropping seemingly unused properties.
        // E.g. Closure Compiler in advanced mode.
        ZoneAwarePromise['resolve'] = ZoneAwarePromise.resolve;
        ZoneAwarePromise['reject'] = ZoneAwarePromise.reject;
        ZoneAwarePromise['race'] = ZoneAwarePromise.race;
        ZoneAwarePromise['all'] = ZoneAwarePromise.all;
        const NativePromise = global[symbolPromise] = global['Promise'];
        const ZONE_AWARE_PROMISE = Zone.__symbol__('ZoneAwarePromise');
        let desc = ObjectGetOwnPropertyDescriptor(global, 'Promise');
        if (!desc || desc.configurable) {
            desc && delete desc.writable;
            desc && delete desc.value;
            if (!desc) {
                desc = { configurable: true, enumerable: true };
            }
            desc.get = function () {
                // if we already set ZoneAwarePromise, use patched one
                // otherwise return native one.
                return global[ZONE_AWARE_PROMISE] ? global[ZONE_AWARE_PROMISE] : global[symbolPromise];
            };
            desc.set = function (NewNativePromise) {
                if (NewNativePromise === ZoneAwarePromise) {
                    // if the NewNativePromise is ZoneAwarePromise
                    // save to global
                    global[ZONE_AWARE_PROMISE] = NewNativePromise;
                }
                else {
                    // if the NewNativePromise is not ZoneAwarePromise
                    // for example: after load zone.js, some library just
                    // set es6-promise to global, if we set it to global
                    // directly, assertZonePatched will fail and angular
                    // will not loaded, so we just set the NewNativePromise
                    // to global[symbolPromise], so the result is just like
                    // we load ES6 Promise before zone.js
                    global[symbolPromise] = NewNativePromise;
                    if (!NewNativePromise.prototype[symbolThen]) {
                        patchThen(NewNativePromise);
                    }
                    api.setNativePromise(NewNativePromise);
                }
            };
            ObjectDefineProperty(global, 'Promise', desc);
        }
        global['Promise'] = ZoneAwarePromise;
        const symbolThenPatched = __symbol__('thenPatched');
        function patchThen(Ctor) {
            const proto = Ctor.prototype;
            const prop = ObjectGetOwnPropertyDescriptor(proto, 'then');
            if (prop && (prop.writable === false || !prop.configurable)) {
                // check Ctor.prototype.then propertyDescriptor is writable or not
                // in meteor env, writable is false, we should ignore such case
                return;
            }
            const originalThen = proto.then;
            // Keep a reference to the original method.
            proto[symbolThen] = originalThen;
            Ctor.prototype.then = function (onResolve, onReject) {
                const wrapped = new ZoneAwarePromise((resolve, reject) => { originalThen.call(this, resolve, reject); });
                return wrapped.then(onResolve, onReject);
            };
            Ctor[symbolThenPatched] = true;
        }
        api.patchThen = patchThen;
        function zoneify(fn) {
            return function () {
                let resultPromise = fn.apply(this, arguments);
                if (resultPromise instanceof ZoneAwarePromise) {
                    return resultPromise;
                }
                let ctor = resultPromise.constructor;
                if (!ctor[symbolThenPatched]) {
                    patchThen(ctor);
                }
                return resultPromise;
            };
        }
        if (NativePromise) {
            patchThen(NativePromise);
            const fetch = global['fetch'];
            if (typeof fetch == 'function') {
                global[api.symbol('fetch')] = fetch;
                global['fetch'] = zoneify(fetch);
            }
        }
        // This is not part of public API, but it is useful for tests, so we expose it.
        Promise[Zone.__symbol__('uncaughtPromiseErrors')] = _uncaughtPromiseErrors;
        return ZoneAwarePromise;
    });

    /**
     * @license
     * Copyright Google Inc. All Rights Reserved.
     *
     * Use of this source code is governed by an MIT-style license that can be
     * found in the LICENSE file at https://angular.io/license
     */
    /**
     * Suppress closure compiler errors about unknown 'Zone' variable
     * @fileoverview
     * @suppress {undefinedVars,globalThis,missingRequire}
     */
    /// <reference types="node"/>
    // issue #989, to reduce bundle size, use short name
    /** Object.getOwnPropertyDescriptor */
    const ObjectGetOwnPropertyDescriptor = Object.getOwnPropertyDescriptor;
    /** Object.defineProperty */
    const ObjectDefineProperty = Object.defineProperty;
    /** Object.getPrototypeOf */
    const ObjectGetPrototypeOf = Object.getPrototypeOf;
    /** Object.create */
    const ObjectCreate = Object.create;
    /** Array.prototype.slice */
    const ArraySlice = Array.prototype.slice;
    /** addEventListener string const */
    const ADD_EVENT_LISTENER_STR = 'addEventListener';
    /** removeEventListener string const */
    const REMOVE_EVENT_LISTENER_STR = 'removeEventListener';
    /** zoneSymbol addEventListener */
    const ZONE_SYMBOL_ADD_EVENT_LISTENER = Zone.__symbol__(ADD_EVENT_LISTENER_STR);
    /** zoneSymbol removeEventListener */
    const ZONE_SYMBOL_REMOVE_EVENT_LISTENER = Zone.__symbol__(REMOVE_EVENT_LISTENER_STR);
    /** true string const */
    const TRUE_STR = 'true';
    /** false string const */
    const FALSE_STR = 'false';
    /** Zone symbol prefix string const. */
    const ZONE_SYMBOL_PREFIX = Zone.__symbol__('');
    function wrapWithCurrentZone(callback, source) {
        return Zone.current.wrap(callback, source);
    }
    function scheduleMacroTaskWithCurrentZone(source, callback, data, customSchedule, customCancel) {
        return Zone.current.scheduleMacroTask(source, callback, data, customSchedule, customCancel);
    }
    const zoneSymbol = Zone.__symbol__;
    const isWindowExists = typeof window !== 'undefined';
    const internalWindow = isWindowExists ? window : undefined;
    const _global = isWindowExists && internalWindow || typeof self === 'object' && self || global;
    const REMOVE_ATTRIBUTE = 'removeAttribute';
    const NULL_ON_PROP_VALUE = [null];
    function bindArguments(args, source) {
        for (let i = args.length - 1; i >= 0; i--) {
            if (typeof args[i] === 'function') {
                args[i] = wrapWithCurrentZone(args[i], source + '_' + i);
            }
        }
        return args;
    }
    function patchPrototype(prototype, fnNames) {
        const source = prototype.constructor['name'];
        for (let i = 0; i < fnNames.length; i++) {
            const name = fnNames[i];
            const delegate = prototype[name];
            if (delegate) {
                const prototypeDesc = ObjectGetOwnPropertyDescriptor(prototype, name);
                if (!isPropertyWritable(prototypeDesc)) {
                    continue;
                }
                prototype[name] = ((delegate) => {
                    const patched = function () {
                        return delegate.apply(this, bindArguments(arguments, source + '.' + name));
                    };
                    attachOriginToPatched(patched, delegate);
                    return patched;
                })(delegate);
            }
        }
    }
    function isPropertyWritable(propertyDesc) {
        if (!propertyDesc) {
            return true;
        }
        if (propertyDesc.writable === false) {
            return false;
        }
        return !(typeof propertyDesc.get === 'function' && typeof propertyDesc.set === 'undefined');
    }
    const isWebWorker = (typeof WorkerGlobalScope !== 'undefined' && self instanceof WorkerGlobalScope);
    // Make sure to access `process` through `_global` so that WebPack does not accidentally browserify
    // this code.
    const isNode = (!('nw' in _global) && typeof _global.process !== 'undefined' &&
        {}.toString.call(_global.process) === '[object process]');
    const isBrowser = !isNode && !isWebWorker && !!(isWindowExists && internalWindow['HTMLElement']);
    // we are in electron of nw, so we are both browser and nodejs
    // Make sure to access `process` through `_global` so that WebPack does not accidentally browserify
    // this code.
    const isMix = typeof _global.process !== 'undefined' &&
        {}.toString.call(_global.process) === '[object process]' && !isWebWorker &&
        !!(isWindowExists && internalWindow['HTMLElement']);
    const zoneSymbolEventNames = {};
    const wrapFn = function (event) {
        // https://github.com/angular/zone.js/issues/911, in IE, sometimes
        // event will be undefined, so we need to use window.event
        event = event || _global.event;
        if (!event) {
            return;
        }
        let eventNameSymbol = zoneSymbolEventNames[event.type];
        if (!eventNameSymbol) {
            eventNameSymbol = zoneSymbolEventNames[event.type] = zoneSymbol('ON_PROPERTY' + event.type);
        }
        const target = this || event.target || _global;
        const listener = target[eventNameSymbol];
        let result;
        if (isBrowser && target === internalWindow && event.type === 'error') {
            // window.onerror have different signiture
            // https://developer.mozilla.org/en-US/docs/Web/API/GlobalEventHandlers/onerror#window.onerror
            // and onerror callback will prevent default when callback return true
            const errorEvent = event;
            result = listener &&
                listener.call(this, errorEvent.message, errorEvent.filename, errorEvent.lineno, errorEvent.colno, errorEvent.error);
            if (result === true) {
                event.preventDefault();
            }
        }
        else {
            result = listener && listener.apply(this, arguments);
            if (result != undefined && !result) {
                event.preventDefault();
            }
        }
        return result;
    };
    function patchProperty(obj, prop, prototype) {
        let desc = ObjectGetOwnPropertyDescriptor(obj, prop);
        if (!desc && prototype) {
            // when patch window object, use prototype to check prop exist or not
            const prototypeDesc = ObjectGetOwnPropertyDescriptor(prototype, prop);
            if (prototypeDesc) {
                desc = { enumerable: true, configurable: true };
            }
        }
        // if the descriptor not exists or is not configurable
        // just return
        if (!desc || !desc.configurable) {
            return;
        }
        const onPropPatchedSymbol = zoneSymbol('on' + prop + 'patched');
        if (obj.hasOwnProperty(onPropPatchedSymbol) && obj[onPropPatchedSymbol]) {
            return;
        }
        // A property descriptor cannot have getter/setter and be writable
        // deleting the writable and value properties avoids this error:
        //
        // TypeError: property descriptors must not specify a value or be writable when a
        // getter or setter has been specified
        delete desc.writable;
        delete desc.value;
        const originalDescGet = desc.get;
        const originalDescSet = desc.set;
        // substr(2) cuz 'onclick' -> 'click', etc
        const eventName = prop.substr(2);
        let eventNameSymbol = zoneSymbolEventNames[eventName];
        if (!eventNameSymbol) {
            eventNameSymbol = zoneSymbolEventNames[eventName] = zoneSymbol('ON_PROPERTY' + eventName);
        }
        desc.set = function (newValue) {
            // in some of windows's onproperty callback, this is undefined
            // so we need to check it
            let target = this;
            if (!target && obj === _global) {
                target = _global;
            }
            if (!target) {
                return;
            }
            let previousValue = target[eventNameSymbol];
            if (previousValue) {
                target.removeEventListener(eventName, wrapFn);
            }
            // issue #978, when onload handler was added before loading zone.js
            // we should remove it with originalDescSet
            if (originalDescSet) {
                originalDescSet.apply(target, NULL_ON_PROP_VALUE);
            }
            if (typeof newValue === 'function') {
                target[eventNameSymbol] = newValue;
                target.addEventListener(eventName, wrapFn, false);
            }
            else {
                target[eventNameSymbol] = null;
            }
        };
        // The getter would return undefined for unassigned properties but the default value of an
        // unassigned property is null
        desc.get = function () {
            // in some of windows's onproperty callback, this is undefined
            // so we need to check it
            let target = this;
            if (!target && obj === _global) {
                target = _global;
            }
            if (!target) {
                return null;
            }
            const listener = target[eventNameSymbol];
            if (listener) {
                return listener;
            }
            else if (originalDescGet) {
                // result will be null when use inline event attribute,
                // such as <button onclick="func();">OK</button>
                // because the onclick function is internal raw uncompiled handler
                // the onclick will be evaluated when first time event was triggered or
                // the property is accessed, https://github.com/angular/zone.js/issues/525
                // so we should use original native get to retrieve the handler
                let value = originalDescGet && originalDescGet.call(this);
                if (value) {
                    desc.set.call(this, value);
                    if (typeof target[REMOVE_ATTRIBUTE] === 'function') {
                        target.removeAttribute(prop);
                    }
                    return value;
                }
            }
            return null;
        };
        ObjectDefineProperty(obj, prop, desc);
        obj[onPropPatchedSymbol] = true;
    }
    function patchOnProperties(obj, properties, prototype) {
        if (properties) {
            for (let i = 0; i < properties.length; i++) {
                patchProperty(obj, 'on' + properties[i], prototype);
            }
        }
        else {
            const onProperties = [];
            for (const prop in obj) {
                if (prop.substr(0, 2) == 'on') {
                    onProperties.push(prop);
                }
            }
            for (let j = 0; j < onProperties.length; j++) {
                patchProperty(obj, onProperties[j], prototype);
            }
        }
    }
    const originalInstanceKey = zoneSymbol('originalInstance');
    // wrap some native API on `window`
    function patchClass(className) {
        const OriginalClass = _global[className];
        if (!OriginalClass)
            return;
        // keep original class in global
        _global[zoneSymbol(className)] = OriginalClass;
        _global[className] = function () {
            const a = bindArguments(arguments, className);
            switch (a.length) {
                case 0:
                    this[originalInstanceKey] = new OriginalClass();
                    break;
                case 1:
                    this[originalInstanceKey] = new OriginalClass(a[0]);
                    break;
                case 2:
                    this[originalInstanceKey] = new OriginalClass(a[0], a[1]);
                    break;
                case 3:
                    this[originalInstanceKey] = new OriginalClass(a[0], a[1], a[2]);
                    break;
                case 4:
                    this[originalInstanceKey] = new OriginalClass(a[0], a[1], a[2], a[3]);
                    break;
                default:
                    throw new Error('Arg list too long.');
            }
        };
        // attach original delegate to patched function
        attachOriginToPatched(_global[className], OriginalClass);
        const instance = new OriginalClass(function () { });
        let prop;
        for (prop in instance) {
            // https://bugs.webkit.org/show_bug.cgi?id=44721
            if (className === 'XMLHttpRequest' && prop === 'responseBlob')
                continue;
            (function (prop) {
                if (typeof instance[prop] === 'function') {
                    _global[className].prototype[prop] = function () {
                        return this[originalInstanceKey][prop].apply(this[originalInstanceKey], arguments);
                    };
                }
                else {
                    ObjectDefineProperty(_global[className].prototype, prop, {
                        set: function (fn) {
                            if (typeof fn === 'function') {
                                this[originalInstanceKey][prop] = wrapWithCurrentZone(fn, className + '.' + prop);
                                // keep callback in wrapped function so we can
                                // use it in Function.prototype.toString to return
                                // the native one.
                                attachOriginToPatched(this[originalInstanceKey][prop], fn);
                            }
                            else {
                                this[originalInstanceKey][prop] = fn;
                            }
                        },
                        get: function () { return this[originalInstanceKey][prop]; }
                    });
                }
            }(prop));
        }
        for (prop in OriginalClass) {
            if (prop !== 'prototype' && OriginalClass.hasOwnProperty(prop)) {
                _global[className][prop] = OriginalClass[prop];
            }
        }
    }
    function copySymbolProperties(src, dest) {
        if (typeof Object.getOwnPropertySymbols !== 'function') {
            return;
        }
        const symbols = Object.getOwnPropertySymbols(src);
        symbols.forEach((symbol) => {
            const desc = Object.getOwnPropertyDescriptor(src, symbol);
            Object.defineProperty(dest, symbol, {
                get: function () { return src[symbol]; },
                set: function (value) {
                    if (desc && (!desc.writable || typeof desc.set !== 'function')) {
                        // if src[symbol] is not writable or not have a setter, just return
                        return;
                    }
                    src[symbol] = value;
                },
                enumerable: desc ? desc.enumerable : true,
                configurable: desc ? desc.configurable : true
            });
        });
    }
    let shouldCopySymbolProperties = false;
    function patchMethod(target, name, patchFn) {
        let proto = target;
        while (proto && !proto.hasOwnProperty(name)) {
            proto = ObjectGetPrototypeOf(proto);
        }
        if (!proto && target[name]) {
            // somehow we did not find it, but we can see it. This happens on IE for Window properties.
            proto = target;
        }
        const delegateName = zoneSymbol(name);
        let delegate = null;
        if (proto && !(delegate = proto[delegateName])) {
            delegate = proto[delegateName] = proto[name];
            // check whether proto[name] is writable
            // some property is readonly in safari, such as HtmlCanvasElement.prototype.toBlob
            const desc = proto && ObjectGetOwnPropertyDescriptor(proto, name);
            if (isPropertyWritable(desc)) {
                const patchDelegate = patchFn(delegate, delegateName, name);
                proto[name] = function () { return patchDelegate(this, arguments); };
                attachOriginToPatched(proto[name], delegate);
                if (shouldCopySymbolProperties) {
                    copySymbolProperties(delegate, proto[name]);
                }
            }
        }
        return delegate;
    }
    // TODO: @JiaLiPassion, support cancel task later if necessary
    function patchMacroTask(obj, funcName, metaCreator) {
        let setNative = null;
        function scheduleTask(task) {
            const data = task.data;
            data.args[data.cbIdx] = function () { task.invoke.apply(this, arguments); };
            setNative.apply(data.target, data.args);
            return task;
        }
        setNative = patchMethod(obj, funcName, (delegate) => function (self, args) {
            const meta = metaCreator(self, args);
            if (meta.cbIdx >= 0 && typeof args[meta.cbIdx] === 'function') {
                return scheduleMacroTaskWithCurrentZone(meta.name, args[meta.cbIdx], meta, scheduleTask);
            }
            else {
                // cause an error by calling it directly.
                return delegate.apply(self, args);
            }
        });
    }
    function attachOriginToPatched(patched, original) {
        patched[zoneSymbol('OriginalDelegate')] = original;
    }
    let isDetectedIEOrEdge = false;
    let ieOrEdge = false;
    function isIE() {
        try {
            const ua = internalWindow.navigator.userAgent;
            if (ua.indexOf('MSIE ') !== -1 || ua.indexOf('Trident/') !== -1) {
                return true;
            }
        }
        catch (error) {
        }
        return false;
    }
    function isIEOrEdge() {
        if (isDetectedIEOrEdge) {
            return ieOrEdge;
        }
        isDetectedIEOrEdge = true;
        try {
            const ua = internalWindow.navigator.userAgent;
            if (ua.indexOf('MSIE ') !== -1 || ua.indexOf('Trident/') !== -1 || ua.indexOf('Edge/') !== -1) {
                ieOrEdge = true;
            }
        }
        catch (error) {
        }
        return ieOrEdge;
    }

    /**
     * @license
     * Copyright Google Inc. All Rights Reserved.
     *
     * Use of this source code is governed by an MIT-style license that can be
     * found in the LICENSE file at https://angular.io/license
     */
    // override Function.prototype.toString to make zone.js patched function
    // look like native function
    Zone.__load_patch('toString', (global) => {
        // patch Func.prototype.toString to let them look like native
        const originalFunctionToString = Function.prototype.toString;
        const ORIGINAL_DELEGATE_SYMBOL = zoneSymbol('OriginalDelegate');
        const PROMISE_SYMBOL = zoneSymbol('Promise');
        const ERROR_SYMBOL = zoneSymbol('Error');
        const newFunctionToString = function toString() {
            if (typeof this === 'function') {
                const originalDelegate = this[ORIGINAL_DELEGATE_SYMBOL];
                if (originalDelegate) {
                    if (typeof originalDelegate === 'function') {
                        return originalFunctionToString.call(originalDelegate);
                    }
                    else {
                        return Object.prototype.toString.call(originalDelegate);
                    }
                }
                if (this === Promise) {
                    const nativePromise = global[PROMISE_SYMBOL];
                    if (nativePromise) {
                        return originalFunctionToString.call(nativePromise);
                    }
                }
                if (this === Error) {
                    const nativeError = global[ERROR_SYMBOL];
                    if (nativeError) {
                        return originalFunctionToString.call(nativeError);
                    }
                }
            }
            return originalFunctionToString.call(this);
        };
        newFunctionToString[ORIGINAL_DELEGATE_SYMBOL] = originalFunctionToString;
        Function.prototype.toString = newFunctionToString;
        // patch Object.prototype.toString to let them look like native
        const originalObjectToString = Object.prototype.toString;
        const PROMISE_OBJECT_TO_STRING = '[object Promise]';
        Object.prototype.toString = function () {
            if (this instanceof Promise) {
                return PROMISE_OBJECT_TO_STRING;
            }
            return originalObjectToString.call(this);
        };
    });

    /**
     * @license
     * Copyright Google Inc. All Rights Reserved.
     *
     * Use of this source code is governed by an MIT-style license that can be
     * found in the LICENSE file at https://angular.io/license
     */
    let passiveSupported = false;
    if (typeof window !== 'undefined') {
        try {
            const options = Object.defineProperty({}, 'passive', { get: function () { passiveSupported = true; } });
            window.addEventListener('test', options, options);
            window.removeEventListener('test', options, options);
        }
        catch (err) {
            passiveSupported = false;
        }
    }
    // an identifier to tell ZoneTask do not create a new invoke closure
    const OPTIMIZED_ZONE_EVENT_TASK_DATA = {
        useG: true
    };
    const zoneSymbolEventNames$1 = {};
    const globalSources = {};
    const EVENT_NAME_SYMBOL_REGX = new RegExp('^' + ZONE_SYMBOL_PREFIX + '(\\w+)(true|false)$');
    const IMMEDIATE_PROPAGATION_SYMBOL = zoneSymbol('propagationStopped');
    function prepareEventNames(eventName, eventNameToString) {
        const falseEventName = (eventNameToString ? eventNameToString(eventName) : eventName) + FALSE_STR;
        const trueEventName = (eventNameToString ? eventNameToString(eventName) : eventName) + TRUE_STR;
        const symbol = ZONE_SYMBOL_PREFIX + falseEventName;
        const symbolCapture = ZONE_SYMBOL_PREFIX + trueEventName;
        zoneSymbolEventNames$1[eventName] = {};
        zoneSymbolEventNames$1[eventName][FALSE_STR] = symbol;
        zoneSymbolEventNames$1[eventName][TRUE_STR] = symbolCapture;
    }
    function patchEventTarget(_global, apis, patchOptions) {
        const ADD_EVENT_LISTENER = (patchOptions && patchOptions.add) || ADD_EVENT_LISTENER_STR;
        const REMOVE_EVENT_LISTENER = (patchOptions && patchOptions.rm) || REMOVE_EVENT_LISTENER_STR;
        const LISTENERS_EVENT_LISTENER = (patchOptions && patchOptions.listeners) || 'eventListeners';
        const REMOVE_ALL_LISTENERS_EVENT_LISTENER = (patchOptions && patchOptions.rmAll) || 'removeAllListeners';
        const zoneSymbolAddEventListener = zoneSymbol(ADD_EVENT_LISTENER);
        const ADD_EVENT_LISTENER_SOURCE = '.' + ADD_EVENT_LISTENER + ':';
        const PREPEND_EVENT_LISTENER = 'prependListener';
        const PREPEND_EVENT_LISTENER_SOURCE = '.' + PREPEND_EVENT_LISTENER + ':';
        const invokeTask = function (task, target, event) {
            // for better performance, check isRemoved which is set
            // by removeEventListener
            if (task.isRemoved) {
                return;
            }
            const delegate = task.callback;
            if (typeof delegate === 'object' && delegate.handleEvent) {
                // create the bind version of handleEvent when invoke
                task.callback = (event) => delegate.handleEvent(event);
                task.originalDelegate = delegate;
            }
            // invoke static task.invoke
            task.invoke(task, target, [event]);
            const options = task.options;
            if (options && typeof options === 'object' && options.once) {
                // if options.once is true, after invoke once remove listener here
                // only browser need to do this, nodejs eventEmitter will cal removeListener
                // inside EventEmitter.once
                const delegate = task.originalDelegate ? task.originalDelegate : task.callback;
                target[REMOVE_EVENT_LISTENER].call(target, event.type, delegate, options);
            }
        };
        // global shared zoneAwareCallback to handle all event callback with capture = false
        const globalZoneAwareCallback = function (event) {
            // https://github.com/angular/zone.js/issues/911, in IE, sometimes
            // event will be undefined, so we need to use window.event
            event = event || _global.event;
            if (!event) {
                return;
            }
            // event.target is needed for Samsung TV and SourceBuffer
            // || global is needed https://github.com/angular/zone.js/issues/190
            const target = this || event.target || _global;
            const tasks = target[zoneSymbolEventNames$1[event.type][FALSE_STR]];
            if (tasks) {
                // invoke all tasks which attached to current target with given event.type and capture = false
                // for performance concern, if task.length === 1, just invoke
                if (tasks.length === 1) {
                    invokeTask(tasks[0], target, event);
                }
                else {
                    // https://github.com/angular/zone.js/issues/836
                    // copy the tasks array before invoke, to avoid
                    // the callback will remove itself or other listener
                    const copyTasks = tasks.slice();
                    for (let i = 0; i < copyTasks.length; i++) {
                        if (event && event[IMMEDIATE_PROPAGATION_SYMBOL] === true) {
                            break;
                        }
                        invokeTask(copyTasks[i], target, event);
                    }
                }
            }
        };
        // global shared zoneAwareCallback to handle all event callback with capture = true
        const globalZoneAwareCaptureCallback = function (event) {
            // https://github.com/angular/zone.js/issues/911, in IE, sometimes
            // event will be undefined, so we need to use window.event
            event = event || _global.event;
            if (!event) {
                return;
            }
            // event.target is needed for Samsung TV and SourceBuffer
            // || global is needed https://github.com/angular/zone.js/issues/190
            const target = this || event.target || _global;
            const tasks = target[zoneSymbolEventNames$1[event.type][TRUE_STR]];
            if (tasks) {
                // invoke all tasks which attached to current target with given event.type and capture = false
                // for performance concern, if task.length === 1, just invoke
                if (tasks.length === 1) {
                    invokeTask(tasks[0], target, event);
                }
                else {
                    // https://github.com/angular/zone.js/issues/836
                    // copy the tasks array before invoke, to avoid
                    // the callback will remove itself or other listener
                    const copyTasks = tasks.slice();
                    for (let i = 0; i < copyTasks.length; i++) {
                        if (event && event[IMMEDIATE_PROPAGATION_SYMBOL] === true) {
                            break;
                        }
                        invokeTask(copyTasks[i], target, event);
                    }
                }
            }
        };
        function patchEventTargetMethods(obj, patchOptions) {
            if (!obj) {
                return false;
            }
            let useGlobalCallback = true;
            if (patchOptions && patchOptions.useG !== undefined) {
                useGlobalCallback = patchOptions.useG;
            }
            const validateHandler = patchOptions && patchOptions.vh;
            let checkDuplicate = true;
            if (patchOptions && patchOptions.chkDup !== undefined) {
                checkDuplicate = patchOptions.chkDup;
            }
            let returnTarget = false;
            if (patchOptions && patchOptions.rt !== undefined) {
                returnTarget = patchOptions.rt;
            }
            let proto = obj;
            while (proto && !proto.hasOwnProperty(ADD_EVENT_LISTENER)) {
                proto = ObjectGetPrototypeOf(proto);
            }
            if (!proto && obj[ADD_EVENT_LISTENER]) {
                // somehow we did not find it, but we can see it. This happens on IE for Window properties.
                proto = obj;
            }
            if (!proto) {
                return false;
            }
            if (proto[zoneSymbolAddEventListener]) {
                return false;
            }
            const eventNameToString = patchOptions && patchOptions.eventNameToString;
            // a shared global taskData to pass data for scheduleEventTask
            // so we do not need to create a new object just for pass some data
            const taskData = {};
            const nativeAddEventListener = proto[zoneSymbolAddEventListener] = proto[ADD_EVENT_LISTENER];
            const nativeRemoveEventListener = proto[zoneSymbol(REMOVE_EVENT_LISTENER)] =
                proto[REMOVE_EVENT_LISTENER];
            const nativeListeners = proto[zoneSymbol(LISTENERS_EVENT_LISTENER)] =
                proto[LISTENERS_EVENT_LISTENER];
            const nativeRemoveAllListeners = proto[zoneSymbol(REMOVE_ALL_LISTENERS_EVENT_LISTENER)] =
                proto[REMOVE_ALL_LISTENERS_EVENT_LISTENER];
            let nativePrependEventListener;
            if (patchOptions && patchOptions.prepend) {
                nativePrependEventListener = proto[zoneSymbol(patchOptions.prepend)] =
                    proto[patchOptions.prepend];
            }
            /**
             * This util function will build an option object with passive option
             * to handle all possible input from the user.
             */
            function buildEventListenerOptions(options, passive) {
                if (!passiveSupported && typeof options === 'object' && options) {
                    // doesn't support passive but user want to pass an object as options.
                    // this will not work on some old browser, so we just pass a boolean
                    // as useCapture parameter
                    return !!options.capture;
                }
                if (!passiveSupported || !passive) {
                    return options;
                }
                if (typeof options === 'boolean') {
                    return { capture: options, passive: true };
                }
                if (!options) {
                    return { passive: true };
                }
                if (typeof options === 'object' && options.passive !== false) {
                    return Object.assign(Object.assign({}, options), { passive: true });
                }
                return options;
            }
            const customScheduleGlobal = function (task) {
                // if there is already a task for the eventName + capture,
                // just return, because we use the shared globalZoneAwareCallback here.
                if (taskData.isExisting) {
                    return;
                }
                return nativeAddEventListener.call(taskData.target, taskData.eventName, taskData.capture ? globalZoneAwareCaptureCallback : globalZoneAwareCallback, taskData.options);
            };
            const customCancelGlobal = function (task) {
                // if task is not marked as isRemoved, this call is directly
                // from Zone.prototype.cancelTask, we should remove the task
                // from tasksList of target first
                if (!task.isRemoved) {
                    const symbolEventNames = zoneSymbolEventNames$1[task.eventName];
                    let symbolEventName;
                    if (symbolEventNames) {
                        symbolEventName = symbolEventNames[task.capture ? TRUE_STR : FALSE_STR];
                    }
                    const existingTasks = symbolEventName && task.target[symbolEventName];
                    if (existingTasks) {
                        for (let i = 0; i < existingTasks.length; i++) {
                            const existingTask = existingTasks[i];
                            if (existingTask === task) {
                                existingTasks.splice(i, 1);
                                // set isRemoved to data for faster invokeTask check
                                task.isRemoved = true;
                                if (existingTasks.length === 0) {
                                    // all tasks for the eventName + capture have gone,
                                    // remove globalZoneAwareCallback and remove the task cache from target
                                    task.allRemoved = true;
                                    task.target[symbolEventName] = null;
                                }
                                break;
                            }
                        }
                    }
                }
                // if all tasks for the eventName + capture have gone,
                // we will really remove the global event callback,
                // if not, return
                if (!task.allRemoved) {
                    return;
                }
                return nativeRemoveEventListener.call(task.target, task.eventName, task.capture ? globalZoneAwareCaptureCallback : globalZoneAwareCallback, task.options);
            };
            const customScheduleNonGlobal = function (task) {
                return nativeAddEventListener.call(taskData.target, taskData.eventName, task.invoke, taskData.options);
            };
            const customSchedulePrepend = function (task) {
                return nativePrependEventListener.call(taskData.target, taskData.eventName, task.invoke, taskData.options);
            };
            const customCancelNonGlobal = function (task) {
                return nativeRemoveEventListener.call(task.target, task.eventName, task.invoke, task.options);
            };
            const customSchedule = useGlobalCallback ? customScheduleGlobal : customScheduleNonGlobal;
            const customCancel = useGlobalCallback ? customCancelGlobal : customCancelNonGlobal;
            const compareTaskCallbackVsDelegate = function (task, delegate) {
                const typeOfDelegate = typeof delegate;
                return (typeOfDelegate === 'function' && task.callback === delegate) ||
                    (typeOfDelegate === 'object' && task.originalDelegate === delegate);
            };
            const compare = (patchOptions && patchOptions.diff) ? patchOptions.diff : compareTaskCallbackVsDelegate;
            const blackListedEvents = Zone[zoneSymbol('BLACK_LISTED_EVENTS')];
            const passiveEvents = _global[zoneSymbol('PASSIVE_EVENTS')];
            const makeAddListener = function (nativeListener, addSource, customScheduleFn, customCancelFn, returnTarget = false, prepend = false) {
                return function () {
                    const target = this || _global;
                    let eventName = arguments[0];
                    if (patchOptions && patchOptions.transferEventName) {
                        eventName = patchOptions.transferEventName(eventName);
                    }
                    let delegate = arguments[1];
                    if (!delegate) {
                        return nativeListener.apply(this, arguments);
                    }
                    if (isNode && eventName === 'uncaughtException') {
                        // don't patch uncaughtException of nodejs to prevent endless loop
                        return nativeListener.apply(this, arguments);
                    }
                    // don't create the bind delegate function for handleEvent
                    // case here to improve addEventListener performance
                    // we will create the bind delegate when invoke
                    let isHandleEvent = false;
                    if (typeof delegate !== 'function') {
                        if (!delegate.handleEvent) {
                            return nativeListener.apply(this, arguments);
                        }
                        isHandleEvent = true;
                    }
                    if (validateHandler && !validateHandler(nativeListener, delegate, target, arguments)) {
                        return;
                    }
                    const passive = passiveSupported && !!passiveEvents && passiveEvents.indexOf(eventName) !== -1;
                    const options = buildEventListenerOptions(arguments[2], passive);
                    if (blackListedEvents) {
                        // check black list
                        for (let i = 0; i < blackListedEvents.length; i++) {
                            if (eventName === blackListedEvents[i]) {
                                if (passive) {
                                    return nativeListener.call(target, eventName, delegate, options);
                                }
                                else {
                                    return nativeListener.apply(this, arguments);
                                }
                            }
                        }
                    }
                    const capture = !options ? false : typeof options === 'boolean' ? true : options.capture;
                    const once = options && typeof options === 'object' ? options.once : false;
                    const zone = Zone.current;
                    let symbolEventNames = zoneSymbolEventNames$1[eventName];
                    if (!symbolEventNames) {
                        prepareEventNames(eventName, eventNameToString);
                        symbolEventNames = zoneSymbolEventNames$1[eventName];
                    }
                    const symbolEventName = symbolEventNames[capture ? TRUE_STR : FALSE_STR];
                    let existingTasks = target[symbolEventName];
                    let isExisting = false;
                    if (existingTasks) {
                        // already have task registered
                        isExisting = true;
                        if (checkDuplicate) {
                            for (let i = 0; i < existingTasks.length; i++) {
                                if (compare(existingTasks[i], delegate)) {
                                    // same callback, same capture, same event name, just return
                                    return;
                                }
                            }
                        }
                    }
                    else {
                        existingTasks = target[symbolEventName] = [];
                    }
                    let source;
                    const constructorName = target.constructor['name'];
                    const targetSource = globalSources[constructorName];
                    if (targetSource) {
                        source = targetSource[eventName];
                    }
                    if (!source) {
                        source = constructorName + addSource +
                            (eventNameToString ? eventNameToString(eventName) : eventName);
                    }
                    // do not create a new object as task.data to pass those things
                    // just use the global shared one
                    taskData.options = options;
                    if (once) {
                        // if addEventListener with once options, we don't pass it to
                        // native addEventListener, instead we keep the once setting
                        // and handle ourselves.
                        taskData.options.once = false;
                    }
                    taskData.target = target;
                    taskData.capture = capture;
                    taskData.eventName = eventName;
                    taskData.isExisting = isExisting;
                    const data = useGlobalCallback ? OPTIMIZED_ZONE_EVENT_TASK_DATA : undefined;
                    // keep taskData into data to allow onScheduleEventTask to access the task information
                    if (data) {
                        data.taskData = taskData;
                    }
                    const task = zone.scheduleEventTask(source, delegate, data, customScheduleFn, customCancelFn);
                    // should clear taskData.target to avoid memory leak
                    // issue, https://github.com/angular/angular/issues/20442
                    taskData.target = null;
                    // need to clear up taskData because it is a global object
                    if (data) {
                        data.taskData = null;
                    }
                    // have to save those information to task in case
                    // application may call task.zone.cancelTask() directly
                    if (once) {
                        options.once = true;
                    }
                    if (!(!passiveSupported && typeof task.options === 'boolean')) {
                        // if not support passive, and we pass an option object
                        // to addEventListener, we should save the options to task
                        task.options = options;
                    }
                    task.target = target;
                    task.capture = capture;
                    task.eventName = eventName;
                    if (isHandleEvent) {
                        // save original delegate for compare to check duplicate
                        task.originalDelegate = delegate;
                    }
                    if (!prepend) {
                        existingTasks.push(task);
                    }
                    else {
                        existingTasks.unshift(task);
                    }
                    if (returnTarget) {
                        return target;
                    }
                };
            };
            proto[ADD_EVENT_LISTENER] = makeAddListener(nativeAddEventListener, ADD_EVENT_LISTENER_SOURCE, customSchedule, customCancel, returnTarget);
            if (nativePrependEventListener) {
                proto[PREPEND_EVENT_LISTENER] = makeAddListener(nativePrependEventListener, PREPEND_EVENT_LISTENER_SOURCE, customSchedulePrepend, customCancel, returnTarget, true);
            }
            proto[REMOVE_EVENT_LISTENER] = function () {
                const target = this || _global;
                let eventName = arguments[0];
                if (patchOptions && patchOptions.transferEventName) {
                    eventName = patchOptions.transferEventName(eventName);
                }
                const options = arguments[2];
                const capture = !options ? false : typeof options === 'boolean' ? true : options.capture;
                const delegate = arguments[1];
                if (!delegate) {
                    return nativeRemoveEventListener.apply(this, arguments);
                }
                if (validateHandler &&
                    !validateHandler(nativeRemoveEventListener, delegate, target, arguments)) {
                    return;
                }
                const symbolEventNames = zoneSymbolEventNames$1[eventName];
                let symbolEventName;
                if (symbolEventNames) {
                    symbolEventName = symbolEventNames[capture ? TRUE_STR : FALSE_STR];
                }
                const existingTasks = symbolEventName && target[symbolEventName];
                if (existingTasks) {
                    for (let i = 0; i < existingTasks.length; i++) {
                        const existingTask = existingTasks[i];
                        if (compare(existingTask, delegate)) {
                            existingTasks.splice(i, 1);
                            // set isRemoved to data for faster invokeTask check
                            existingTask.isRemoved = true;
                            if (existingTasks.length === 0) {
                                // all tasks for the eventName + capture have gone,
                                // remove globalZoneAwareCallback and remove the task cache from target
                                existingTask.allRemoved = true;
                                target[symbolEventName] = null;
                                // in the target, we have an event listener which is added by on_property
                                // such as target.onclick = function() {}, so we need to clear this internal
                                // property too if all delegates all removed
                                if (typeof eventName === 'string') {
                                    const onPropertySymbol = ZONE_SYMBOL_PREFIX + 'ON_PROPERTY' + eventName;
                                    target[onPropertySymbol] = null;
                                }
                            }
                            existingTask.zone.cancelTask(existingTask);
                            if (returnTarget) {
                                return target;
                            }
                            return;
                        }
                    }
                }
                // issue 930, didn't find the event name or callback
                // from zone kept existingTasks, the callback maybe
                // added outside of zone, we need to call native removeEventListener
                // to try to remove it.
                return nativeRemoveEventListener.apply(this, arguments);
            };
            proto[LISTENERS_EVENT_LISTENER] = function () {
                const target = this || _global;
                let eventName = arguments[0];
                if (patchOptions && patchOptions.transferEventName) {
                    eventName = patchOptions.transferEventName(eventName);
                }
                const listeners = [];
                const tasks = findEventTasks(target, eventNameToString ? eventNameToString(eventName) : eventName);
                for (let i = 0; i < tasks.length; i++) {
                    const task = tasks[i];
                    let delegate = task.originalDelegate ? task.originalDelegate : task.callback;
                    listeners.push(delegate);
                }
                return listeners;
            };
            proto[REMOVE_ALL_LISTENERS_EVENT_LISTENER] = function () {
                const target = this || _global;
                let eventName = arguments[0];
                if (!eventName) {
                    const keys = Object.keys(target);
                    for (let i = 0; i < keys.length; i++) {
                        const prop = keys[i];
                        const match = EVENT_NAME_SYMBOL_REGX.exec(prop);
                        let evtName = match && match[1];
                        // in nodejs EventEmitter, removeListener event is
                        // used for monitoring the removeListener call,
                        // so just keep removeListener eventListener until
                        // all other eventListeners are removed
                        if (evtName && evtName !== 'removeListener') {
                            this[REMOVE_ALL_LISTENERS_EVENT_LISTENER].call(this, evtName);
                        }
                    }
                    // remove removeListener listener finally
                    this[REMOVE_ALL_LISTENERS_EVENT_LISTENER].call(this, 'removeListener');
                }
                else {
                    if (patchOptions && patchOptions.transferEventName) {
                        eventName = patchOptions.transferEventName(eventName);
                    }
                    const symbolEventNames = zoneSymbolEventNames$1[eventName];
                    if (symbolEventNames) {
                        const symbolEventName = symbolEventNames[FALSE_STR];
                        const symbolCaptureEventName = symbolEventNames[TRUE_STR];
                        const tasks = target[symbolEventName];
                        const captureTasks = target[symbolCaptureEventName];
                        if (tasks) {
                            const removeTasks = tasks.slice();
                            for (let i = 0; i < removeTasks.length; i++) {
                                const task = removeTasks[i];
                                let delegate = task.originalDelegate ? task.originalDelegate : task.callback;
                                this[REMOVE_EVENT_LISTENER].call(this, eventName, delegate, task.options);
                            }
                        }
                        if (captureTasks) {
                            const removeTasks = captureTasks.slice();
                            for (let i = 0; i < removeTasks.length; i++) {
                                const task = removeTasks[i];
                                let delegate = task.originalDelegate ? task.originalDelegate : task.callback;
                                this[REMOVE_EVENT_LISTENER].call(this, eventName, delegate, task.options);
                            }
                        }
                    }
                }
                if (returnTarget) {
                    return this;
                }
            };
            // for native toString patch
            attachOriginToPatched(proto[ADD_EVENT_LISTENER], nativeAddEventListener);
            attachOriginToPatched(proto[REMOVE_EVENT_LISTENER], nativeRemoveEventListener);
            if (nativeRemoveAllListeners) {
                attachOriginToPatched(proto[REMOVE_ALL_LISTENERS_EVENT_LISTENER], nativeRemoveAllListeners);
            }
            if (nativeListeners) {
                attachOriginToPatched(proto[LISTENERS_EVENT_LISTENER], nativeListeners);
            }
            return true;
        }
        let results = [];
        for (let i = 0; i < apis.length; i++) {
            results[i] = patchEventTargetMethods(apis[i], patchOptions);
        }
        return results;
    }
    function findEventTasks(target, eventName) {
        if (!eventName) {
            const foundTasks = [];
            for (let prop in target) {
                const match = EVENT_NAME_SYMBOL_REGX.exec(prop);
                let evtName = match && match[1];
                if (evtName && (!eventName || evtName === eventName)) {
                    const tasks = target[prop];
                    if (tasks) {
                        for (let i = 0; i < tasks.length; i++) {
                            foundTasks.push(tasks[i]);
                        }
                    }
                }
            }
            return foundTasks;
        }
        let symbolEventName = zoneSymbolEventNames$1[eventName];
        if (!symbolEventName) {
            prepareEventNames(eventName);
            symbolEventName = zoneSymbolEventNames$1[eventName];
        }
        const captureFalseTasks = target[symbolEventName[FALSE_STR]];
        const captureTrueTasks = target[symbolEventName[TRUE_STR]];
        if (!captureFalseTasks) {
            return captureTrueTasks ? captureTrueTasks.slice() : [];
        }
        else {
            return captureTrueTasks ? captureFalseTasks.concat(captureTrueTasks) :
                captureFalseTasks.slice();
        }
    }
    function patchEventPrototype(global, api) {
        const Event = global['Event'];
        if (Event && Event.prototype) {
            api.patchMethod(Event.prototype, 'stopImmediatePropagation', (delegate) => function (self, args) {
                self[IMMEDIATE_PROPAGATION_SYMBOL] = true;
                // we need to call the native stopImmediatePropagation
                // in case in some hybrid application, some part of
                // application will be controlled by zone, some are not
                delegate && delegate.apply(self, args);
            });
        }
    }

    /**
     * @license
     * Copyright Google Inc. All Rights Reserved.
     *
     * Use of this source code is governed by an MIT-style license that can be
     * found in the LICENSE file at https://angular.io/license
     */
    function patchCallbacks(api, target, targetName, method, callbacks) {
        const symbol = Zone.__symbol__(method);
        if (target[symbol]) {
            return;
        }
        const nativeDelegate = target[symbol] = target[method];
        target[method] = function (name, opts, options) {
            if (opts && opts.prototype) {
                callbacks.forEach(function (callback) {
                    const source = `${targetName}.${method}::` + callback;
                    const prototype = opts.prototype;
                    if (prototype.hasOwnProperty(callback)) {
                        const descriptor = api.ObjectGetOwnPropertyDescriptor(prototype, callback);
                        if (descriptor && descriptor.value) {
                            descriptor.value = api.wrapWithCurrentZone(descriptor.value, source);
                            api._redefineProperty(opts.prototype, callback, descriptor);
                        }
                        else if (prototype[callback]) {
                            prototype[callback] = api.wrapWithCurrentZone(prototype[callback], source);
                        }
                    }
                    else if (prototype[callback]) {
                        prototype[callback] = api.wrapWithCurrentZone(prototype[callback], source);
                    }
                });
            }
            return nativeDelegate.call(target, name, opts, options);
        };
        api.attachOriginToPatched(target[method], nativeDelegate);
    }

    /**
     * @license
     * Copyright Google Inc. All Rights Reserved.
     *
     * Use of this source code is governed by an MIT-style license that can be
     * found in the LICENSE file at https://angular.io/license
     */
    const globalEventHandlersEventNames = [
        'abort',
        'animationcancel',
        'animationend',
        'animationiteration',
        'auxclick',
        'beforeinput',
        'blur',
        'cancel',
        'canplay',
        'canplaythrough',
        'change',
        'compositionstart',
        'compositionupdate',
        'compositionend',
        'cuechange',
        'click',
        'close',
        'contextmenu',
        'curechange',
        'dblclick',
        'drag',
        'dragend',
        'dragenter',
        'dragexit',
        'dragleave',
        'dragover',
        'drop',
        'durationchange',
        'emptied',
        'ended',
        'error',
        'focus',
        'focusin',
        'focusout',
        'gotpointercapture',
        'input',
        'invalid',
        'keydown',
        'keypress',
        'keyup',
        'load',
        'loadstart',
        'loadeddata',
        'loadedmetadata',
        'lostpointercapture',
        'mousedown',
        'mouseenter',
        'mouseleave',
        'mousemove',
        'mouseout',
        'mouseover',
        'mouseup',
        'mousewheel',
        'orientationchange',
        'pause',
        'play',
        'playing',
        'pointercancel',
        'pointerdown',
        'pointerenter',
        'pointerleave',
        'pointerlockchange',
        'mozpointerlockchange',
        'webkitpointerlockerchange',
        'pointerlockerror',
        'mozpointerlockerror',
        'webkitpointerlockerror',
        'pointermove',
        'pointout',
        'pointerover',
        'pointerup',
        'progress',
        'ratechange',
        'reset',
        'resize',
        'scroll',
        'seeked',
        'seeking',
        'select',
        'selectionchange',
        'selectstart',
        'show',
        'sort',
        'stalled',
        'submit',
        'suspend',
        'timeupdate',
        'volumechange',
        'touchcancel',
        'touchmove',
        'touchstart',
        'touchend',
        'transitioncancel',
        'transitionend',
        'waiting',
        'wheel'
    ];
    const documentEventNames = [
        'afterscriptexecute', 'beforescriptexecute', 'DOMContentLoaded', 'freeze', 'fullscreenchange',
        'mozfullscreenchange', 'webkitfullscreenchange', 'msfullscreenchange', 'fullscreenerror',
        'mozfullscreenerror', 'webkitfullscreenerror', 'msfullscreenerror', 'readystatechange',
        'visibilitychange', 'resume'
    ];
    const windowEventNames = [
        'absolutedeviceorientation',
        'afterinput',
        'afterprint',
        'appinstalled',
        'beforeinstallprompt',
        'beforeprint',
        'beforeunload',
        'devicelight',
        'devicemotion',
        'deviceorientation',
        'deviceorientationabsolute',
        'deviceproximity',
        'hashchange',
        'languagechange',
        'message',
        'mozbeforepaint',
        'offline',
        'online',
        'paint',
        'pageshow',
        'pagehide',
        'popstate',
        'rejectionhandled',
        'storage',
        'unhandledrejection',
        'unload',
        'userproximity',
        'vrdisplayconnected',
        'vrdisplaydisconnected',
        'vrdisplaypresentchange'
    ];
    const htmlElementEventNames = [
        'beforecopy', 'beforecut', 'beforepaste', 'copy', 'cut', 'paste', 'dragstart', 'loadend',
        'animationstart', 'search', 'transitionrun', 'transitionstart', 'webkitanimationend',
        'webkitanimationiteration', 'webkitanimationstart', 'webkittransitionend'
    ];
    const mediaElementEventNames = ['encrypted', 'waitingforkey', 'msneedkey', 'mozinterruptbegin', 'mozinterruptend'];
    const ieElementEventNames = [
        'activate',
        'afterupdate',
        'ariarequest',
        'beforeactivate',
        'beforedeactivate',
        'beforeeditfocus',
        'beforeupdate',
        'cellchange',
        'controlselect',
        'dataavailable',
        'datasetchanged',
        'datasetcomplete',
        'errorupdate',
        'filterchange',
        'layoutcomplete',
        'losecapture',
        'move',
        'moveend',
        'movestart',
        'propertychange',
        'resizeend',
        'resizestart',
        'rowenter',
        'rowexit',
        'rowsdelete',
        'rowsinserted',
        'command',
        'compassneedscalibration',
        'deactivate',
        'help',
        'mscontentzoom',
        'msmanipulationstatechanged',
        'msgesturechange',
        'msgesturedoubletap',
        'msgestureend',
        'msgesturehold',
        'msgesturestart',
        'msgesturetap',
        'msgotpointercapture',
        'msinertiastart',
        'mslostpointercapture',
        'mspointercancel',
        'mspointerdown',
        'mspointerenter',
        'mspointerhover',
        'mspointerleave',
        'mspointermove',
        'mspointerout',
        'mspointerover',
        'mspointerup',
        'pointerout',
        'mssitemodejumplistitemremoved',
        'msthumbnailclick',
        'stop',
        'storagecommit'
    ];
    const webglEventNames = ['webglcontextrestored', 'webglcontextlost', 'webglcontextcreationerror'];
    const formEventNames = ['autocomplete', 'autocompleteerror'];
    const detailEventNames = ['toggle'];
    const frameEventNames = ['load'];
    const frameSetEventNames = ['blur', 'error', 'focus', 'load', 'resize', 'scroll', 'messageerror'];
    const marqueeEventNames = ['bounce', 'finish', 'start'];
    const XMLHttpRequestEventNames = [
        'loadstart', 'progress', 'abort', 'error', 'load', 'progress', 'timeout', 'loadend',
        'readystatechange'
    ];
    const IDBIndexEventNames = ['upgradeneeded', 'complete', 'abort', 'success', 'error', 'blocked', 'versionchange', 'close'];
    const websocketEventNames = ['close', 'error', 'open', 'message'];
    const workerEventNames = ['error', 'message'];
    const eventNames = globalEventHandlersEventNames.concat(webglEventNames, formEventNames, detailEventNames, documentEventNames, windowEventNames, htmlElementEventNames, ieElementEventNames);
    function filterProperties(target, onProperties, ignoreProperties) {
        if (!ignoreProperties || ignoreProperties.length === 0) {
            return onProperties;
        }
        const tip = ignoreProperties.filter(ip => ip.target === target);
        if (!tip || tip.length === 0) {
            return onProperties;
        }
        const targetIgnoreProperties = tip[0].ignoreProperties;
        return onProperties.filter(op => targetIgnoreProperties.indexOf(op) === -1);
    }
    function patchFilteredProperties(target, onProperties, ignoreProperties, prototype) {
        // check whether target is available, sometimes target will be undefined
        // because different browser or some 3rd party plugin.
        if (!target) {
            return;
        }
        const filteredProperties = filterProperties(target, onProperties, ignoreProperties);
        patchOnProperties(target, filteredProperties, prototype);
    }
    function propertyDescriptorPatch(api, _global) {
        if (isNode && !isMix) {
            return;
        }
        if (Zone[api.symbol('patchEvents')]) {
            // events are already been patched by legacy patch.
            return;
        }
        const supportsWebSocket = typeof WebSocket !== 'undefined';
        const ignoreProperties = _global['__Zone_ignore_on_properties'];
        // for browsers that we can patch the descriptor:  Chrome & Firefox
        if (isBrowser) {
            const internalWindow = window;
            const ignoreErrorProperties = isIE ? [{ target: internalWindow, ignoreProperties: ['error'] }] : [];
            // in IE/Edge, onProp not exist in window object, but in WindowPrototype
            // so we need to pass WindowPrototype to check onProp exist or not
            patchFilteredProperties(internalWindow, eventNames.concat(['messageerror']), ignoreProperties ? ignoreProperties.concat(ignoreErrorProperties) : ignoreProperties, ObjectGetPrototypeOf(internalWindow));
            patchFilteredProperties(Document.prototype, eventNames, ignoreProperties);
            if (typeof internalWindow['SVGElement'] !== 'undefined') {
                patchFilteredProperties(internalWindow['SVGElement'].prototype, eventNames, ignoreProperties);
            }
            patchFilteredProperties(Element.prototype, eventNames, ignoreProperties);
            patchFilteredProperties(HTMLElement.prototype, eventNames, ignoreProperties);
            patchFilteredProperties(HTMLMediaElement.prototype, mediaElementEventNames, ignoreProperties);
            patchFilteredProperties(HTMLFrameSetElement.prototype, windowEventNames.concat(frameSetEventNames), ignoreProperties);
            patchFilteredProperties(HTMLBodyElement.prototype, windowEventNames.concat(frameSetEventNames), ignoreProperties);
            patchFilteredProperties(HTMLFrameElement.prototype, frameEventNames, ignoreProperties);
            patchFilteredProperties(HTMLIFrameElement.prototype, frameEventNames, ignoreProperties);
            const HTMLMarqueeElement = internalWindow['HTMLMarqueeElement'];
            if (HTMLMarqueeElement) {
                patchFilteredProperties(HTMLMarqueeElement.prototype, marqueeEventNames, ignoreProperties);
            }
            const Worker = internalWindow['Worker'];
            if (Worker) {
                patchFilteredProperties(Worker.prototype, workerEventNames, ignoreProperties);
            }
        }
        const XMLHttpRequest = _global['XMLHttpRequest'];
        if (XMLHttpRequest) {
            // XMLHttpRequest is not available in ServiceWorker, so we need to check here
            patchFilteredProperties(XMLHttpRequest.prototype, XMLHttpRequestEventNames, ignoreProperties);
        }
        const XMLHttpRequestEventTarget = _global['XMLHttpRequestEventTarget'];
        if (XMLHttpRequestEventTarget) {
            patchFilteredProperties(XMLHttpRequestEventTarget && XMLHttpRequestEventTarget.prototype, XMLHttpRequestEventNames, ignoreProperties);
        }
        if (typeof IDBIndex !== 'undefined') {
            patchFilteredProperties(IDBIndex.prototype, IDBIndexEventNames, ignoreProperties);
            patchFilteredProperties(IDBRequest.prototype, IDBIndexEventNames, ignoreProperties);
            patchFilteredProperties(IDBOpenDBRequest.prototype, IDBIndexEventNames, ignoreProperties);
            patchFilteredProperties(IDBDatabase.prototype, IDBIndexEventNames, ignoreProperties);
            patchFilteredProperties(IDBTransaction.prototype, IDBIndexEventNames, ignoreProperties);
            patchFilteredProperties(IDBCursor.prototype, IDBIndexEventNames, ignoreProperties);
        }
        if (supportsWebSocket) {
            patchFilteredProperties(WebSocket.prototype, websocketEventNames, ignoreProperties);
        }
    }

    /**
     * @license
     * Copyright Google Inc. All Rights Reserved.
     *
     * Use of this source code is governed by an MIT-style license that can be
     * found in the LICENSE file at https://angular.io/license
     */
    Zone.__load_patch('util', (global, Zone, api) => {
        api.patchOnProperties = patchOnProperties;
        api.patchMethod = patchMethod;
        api.bindArguments = bindArguments;
        api.patchMacroTask = patchMacroTask;
        // In earlier version of zone.js (<0.9.0), we use env name `__zone_symbol__BLACK_LISTED_EVENTS` to
        // define which events will not be patched by `Zone.js`.
        // In newer version (>=0.9.0), we change the env name to `__zone_symbol__UNPATCHED_EVENTS` to keep
        // the name consistent with angular repo.
        // The  `__zone_symbol__BLACK_LISTED_EVENTS` is deprecated, but it is still be supported for
        // backwards compatibility.
        const SYMBOL_BLACK_LISTED_EVENTS = Zone.__symbol__('BLACK_LISTED_EVENTS');
        const SYMBOL_UNPATCHED_EVENTS = Zone.__symbol__('UNPATCHED_EVENTS');
        if (global[SYMBOL_UNPATCHED_EVENTS]) {
            global[SYMBOL_BLACK_LISTED_EVENTS] = global[SYMBOL_UNPATCHED_EVENTS];
        }
        if (global[SYMBOL_BLACK_LISTED_EVENTS]) {
            Zone[SYMBOL_BLACK_LISTED_EVENTS] = Zone[SYMBOL_UNPATCHED_EVENTS] =
                global[SYMBOL_BLACK_LISTED_EVENTS];
        }
        api.patchEventPrototype = patchEventPrototype;
        api.patchEventTarget = patchEventTarget;
        api.isIEOrEdge = isIEOrEdge;
        api.ObjectDefineProperty = ObjectDefineProperty;
        api.ObjectGetOwnPropertyDescriptor = ObjectGetOwnPropertyDescriptor;
        api.ObjectCreate = ObjectCreate;
        api.ArraySlice = ArraySlice;
        api.patchClass = patchClass;
        api.wrapWithCurrentZone = wrapWithCurrentZone;
        api.filterProperties = filterProperties;
        api.attachOriginToPatched = attachOriginToPatched;
        api._redefineProperty = Object.defineProperty;
        api.patchCallbacks = patchCallbacks;
        api.getGlobalObjects = () => ({ globalSources, zoneSymbolEventNames: zoneSymbolEventNames$1, eventNames, isBrowser, isMix, isNode, TRUE_STR,
            FALSE_STR, ZONE_SYMBOL_PREFIX, ADD_EVENT_LISTENER_STR, REMOVE_EVENT_LISTENER_STR });
    });

    /**
     * @license
     * Copyright Google Inc. All Rights Reserved.
     *
     * Use of this source code is governed by an MIT-style license that can be
     * found in the LICENSE file at https://angular.io/license
     */
    const taskSymbol = zoneSymbol('zoneTask');
    function patchTimer(window, setName, cancelName, nameSuffix) {
        let setNative = null;
        let clearNative = null;
        setName += nameSuffix;
        cancelName += nameSuffix;
        const tasksByHandleId = {};
        function scheduleTask(task) {
            const data = task.data;
            function timer() {
                try {
                    task.invoke.apply(this, arguments);
                }
                finally {
                    // issue-934, task will be cancelled
                    // even it is a periodic task such as
                    // setInterval
                    if (!(task.data && task.data.isPeriodic)) {
                        if (typeof data.handleId === 'number') {
                            // in non-nodejs env, we remove timerId
                            // from local cache
                            delete tasksByHandleId[data.handleId];
                        }
                        else if (data.handleId) {
                            // Node returns complex objects as handleIds
                            // we remove task reference from timer object
                            data.handleId[taskSymbol] = null;
                        }
                    }
                }
            }
            data.args[0] = timer;
            data.handleId = setNative.apply(window, data.args);
            return task;
        }
        function clearTask(task) { return clearNative(task.data.handleId); }
        setNative =
            patchMethod(window, setName, (delegate) => function (self, args) {
                if (typeof args[0] === 'function') {
                    const options = {
                        isPeriodic: nameSuffix === 'Interval',
                        delay: (nameSuffix === 'Timeout' || nameSuffix === 'Interval') ? args[1] || 0 :
                            undefined,
                        args: args
                    };
                    const task = scheduleMacroTaskWithCurrentZone(setName, args[0], options, scheduleTask, clearTask);
                    if (!task) {
                        return task;
                    }
                    // Node.js must additionally support the ref and unref functions.
                    const handle = task.data.handleId;
                    if (typeof handle === 'number') {
                        // for non nodejs env, we save handleId: task
                        // mapping in local cache for clearTimeout
                        tasksByHandleId[handle] = task;
                    }
                    else if (handle) {
                        // for nodejs env, we save task
                        // reference in timerId Object for clearTimeout
                        handle[taskSymbol] = task;
                    }
                    // check whether handle is null, because some polyfill or browser
                    // may return undefined from setTimeout/setInterval/setImmediate/requestAnimationFrame
                    if (handle && handle.ref && handle.unref && typeof handle.ref === 'function' &&
                        typeof handle.unref === 'function') {
                        task.ref = handle.ref.bind(handle);
                        task.unref = handle.unref.bind(handle);
                    }
                    if (typeof handle === 'number' || handle) {
                        return handle;
                    }
                    return task;
                }
                else {
                    // cause an error by calling it directly.
                    return delegate.apply(window, args);
                }
            });
        clearNative =
            patchMethod(window, cancelName, (delegate) => function (self, args) {
                const id = args[0];
                let task;
                if (typeof id === 'number') {
                    // non nodejs env.
                    task = tasksByHandleId[id];
                }
                else {
                    // nodejs env.
                    task = id && id[taskSymbol];
                    // other environments.
                    if (!task) {
                        task = id;
                    }
                }
                if (task && typeof task.type === 'string') {
                    if (task.state !== 'notScheduled' &&
                        (task.cancelFn && task.data.isPeriodic || task.runCount === 0)) {
                        if (typeof id === 'number') {
                            delete tasksByHandleId[id];
                        }
                        else if (id) {
                            id[taskSymbol] = null;
                        }
                        // Do not cancel already canceled functions
                        task.zone.cancelTask(task);
                    }
                }
                else {
                    // cause an error by calling it directly.
                    delegate.apply(window, args);
                }
            });
    }

    /**
     * @license
     * Copyright Google Inc. All Rights Reserved.
     *
     * Use of this source code is governed by an MIT-style license that can be
     * found in the LICENSE file at https://angular.io/license
     */
    function patchCustomElements(_global, api) {
        const { isBrowser, isMix } = api.getGlobalObjects();
        if ((!isBrowser && !isMix) || !_global['customElements'] || !('customElements' in _global)) {
            return;
        }
        const callbacks = ['connectedCallback', 'disconnectedCallback', 'adoptedCallback', 'attributeChangedCallback'];
        api.patchCallbacks(api, _global.customElements, 'customElements', 'define', callbacks);
    }

    /**
     * @license
     * Copyright Google Inc. All Rights Reserved.
     *
     * Use of this source code is governed by an MIT-style license that can be
     * found in the LICENSE file at https://angular.io/license
     */
    function eventTargetPatch(_global, api) {
        if (Zone[api.symbol('patchEventTarget')]) {
            // EventTarget is already patched.
            return;
        }
        const { eventNames, zoneSymbolEventNames, TRUE_STR, FALSE_STR, ZONE_SYMBOL_PREFIX } = api.getGlobalObjects();
        //  predefine all __zone_symbol__ + eventName + true/false string
        for (let i = 0; i < eventNames.length; i++) {
            const eventName = eventNames[i];
            const falseEventName = eventName + FALSE_STR;
            const trueEventName = eventName + TRUE_STR;
            const symbol = ZONE_SYMBOL_PREFIX + falseEventName;
            const symbolCapture = ZONE_SYMBOL_PREFIX + trueEventName;
            zoneSymbolEventNames[eventName] = {};
            zoneSymbolEventNames[eventName][FALSE_STR] = symbol;
            zoneSymbolEventNames[eventName][TRUE_STR] = symbolCapture;
        }
        const EVENT_TARGET = _global['EventTarget'];
        if (!EVENT_TARGET || !EVENT_TARGET.prototype) {
            return;
        }
        api.patchEventTarget(_global, [EVENT_TARGET && EVENT_TARGET.prototype]);
        return true;
    }
    function patchEvent(global, api) {
        api.patchEventPrototype(global, api);
    }

    /**
     * @license
     * Copyright Google Inc. All Rights Reserved.
     *
     * Use of this source code is governed by an MIT-style license that can be
     * found in the LICENSE file at https://angular.io/license
     */
    Zone.__load_patch('legacy', (global) => {
        const legacyPatch = global[Zone.__symbol__('legacyPatch')];
        if (legacyPatch) {
            legacyPatch();
        }
    });
    Zone.__load_patch('timers', (global) => {
        const set = 'set';
        const clear = 'clear';
        patchTimer(global, set, clear, 'Timeout');
        patchTimer(global, set, clear, 'Interval');
        patchTimer(global, set, clear, 'Immediate');
    });
    Zone.__load_patch('requestAnimationFrame', (global) => {
        patchTimer(global, 'request', 'cancel', 'AnimationFrame');
        patchTimer(global, 'mozRequest', 'mozCancel', 'AnimationFrame');
        patchTimer(global, 'webkitRequest', 'webkitCancel', 'AnimationFrame');
    });
    Zone.__load_patch('blocking', (global, Zone) => {
        const blockingMethods = ['alert', 'prompt', 'confirm'];
        for (let i = 0; i < blockingMethods.length; i++) {
            const name = blockingMethods[i];
            patchMethod(global, name, (delegate, symbol, name) => {
                return function (s, args) {
                    return Zone.current.run(delegate, global, args, name);
                };
            });
        }
    });
    Zone.__load_patch('EventTarget', (global, Zone, api) => {
        patchEvent(global, api);
        eventTargetPatch(global, api);
        // patch XMLHttpRequestEventTarget's addEventListener/removeEventListener
        const XMLHttpRequestEventTarget = global['XMLHttpRequestEventTarget'];
        if (XMLHttpRequestEventTarget && XMLHttpRequestEventTarget.prototype) {
            api.patchEventTarget(global, [XMLHttpRequestEventTarget.prototype]);
        }
        patchClass('MutationObserver');
        patchClass('WebKitMutationObserver');
        patchClass('IntersectionObserver');
        patchClass('FileReader');
    });
    Zone.__load_patch('on_property', (global, Zone, api) => {
        propertyDescriptorPatch(api, global);
    });
    Zone.__load_patch('customElements', (global, Zone, api) => {
        patchCustomElements(global, api);
    });
    Zone.__load_patch('XHR', (global, Zone) => {
        // Treat XMLHttpRequest as a macrotask.
        patchXHR(global);
        const XHR_TASK = zoneSymbol('xhrTask');
        const XHR_SYNC = zoneSymbol('xhrSync');
        const XHR_LISTENER = zoneSymbol('xhrListener');
        const XHR_SCHEDULED = zoneSymbol('xhrScheduled');
        const XHR_URL = zoneSymbol('xhrURL');
        const XHR_ERROR_BEFORE_SCHEDULED = zoneSymbol('xhrErrorBeforeScheduled');
        function patchXHR(window) {
            const XMLHttpRequest = window['XMLHttpRequest'];
            if (!XMLHttpRequest) {
                // XMLHttpRequest is not available in service worker
                return;
            }
            const XMLHttpRequestPrototype = XMLHttpRequest.prototype;
            function findPendingTask(target) { return target[XHR_TASK]; }
            let oriAddListener = XMLHttpRequestPrototype[ZONE_SYMBOL_ADD_EVENT_LISTENER];
            let oriRemoveListener = XMLHttpRequestPrototype[ZONE_SYMBOL_REMOVE_EVENT_LISTENER];
            if (!oriAddListener) {
                const XMLHttpRequestEventTarget = window['XMLHttpRequestEventTarget'];
                if (XMLHttpRequestEventTarget) {
                    const XMLHttpRequestEventTargetPrototype = XMLHttpRequestEventTarget.prototype;
                    oriAddListener = XMLHttpRequestEventTargetPrototype[ZONE_SYMBOL_ADD_EVENT_LISTENER];
                    oriRemoveListener = XMLHttpRequestEventTargetPrototype[ZONE_SYMBOL_REMOVE_EVENT_LISTENER];
                }
            }
            const READY_STATE_CHANGE = 'readystatechange';
            const SCHEDULED = 'scheduled';
            function scheduleTask(task) {
                const data = task.data;
                const target = data.target;
                target[XHR_SCHEDULED] = false;
                target[XHR_ERROR_BEFORE_SCHEDULED] = false;
                // remove existing event listener
                const listener = target[XHR_LISTENER];
                if (!oriAddListener) {
                    oriAddListener = target[ZONE_SYMBOL_ADD_EVENT_LISTENER];
                    oriRemoveListener = target[ZONE_SYMBOL_REMOVE_EVENT_LISTENER];
                }
                if (listener) {
                    oriRemoveListener.call(target, READY_STATE_CHANGE, listener);
                }
                const newListener = target[XHR_LISTENER] = () => {
                    if (target.readyState === target.DONE) {
                        // sometimes on some browsers XMLHttpRequest will fire onreadystatechange with
                        // readyState=4 multiple times, so we need to check task state here
                        if (!data.aborted && target[XHR_SCHEDULED] && task.state === SCHEDULED) {
                            // check whether the xhr has registered onload listener
                            // if that is the case, the task should invoke after all
                            // onload listeners finish.
                            const loadTasks = target[Zone.__symbol__('loadfalse')];
                            if (loadTasks && loadTasks.length > 0) {
                                const oriInvoke = task.invoke;
                                task.invoke = function () {
                                    // need to load the tasks again, because in other
                                    // load listener, they may remove themselves
                                    const loadTasks = target[Zone.__symbol__('loadfalse')];
                                    for (let i = 0; i < loadTasks.length; i++) {
                                        if (loadTasks[i] === task) {
                                            loadTasks.splice(i, 1);
                                        }
                                    }
                                    if (!data.aborted && task.state === SCHEDULED) {
                                        oriInvoke.call(task);
                                    }
                                };
                                loadTasks.push(task);
                            }
                            else {
                                task.invoke();
                            }
                        }
                        else if (!data.aborted && target[XHR_SCHEDULED] === false) {
                            // error occurs when xhr.send()
                            target[XHR_ERROR_BEFORE_SCHEDULED] = true;
                        }
                    }
                };
                oriAddListener.call(target, READY_STATE_CHANGE, newListener);
                const storedTask = target[XHR_TASK];
                if (!storedTask) {
                    target[XHR_TASK] = task;
                }
                sendNative.apply(target, data.args);
                target[XHR_SCHEDULED] = true;
                return task;
            }
            function placeholderCallback() { }
            function clearTask(task) {
                const data = task.data;
                // Note - ideally, we would call data.target.removeEventListener here, but it's too late
                // to prevent it from firing. So instead, we store info for the event listener.
                data.aborted = true;
                return abortNative.apply(data.target, data.args);
            }
            const openNative = patchMethod(XMLHttpRequestPrototype, 'open', () => function (self, args) {
                self[XHR_SYNC] = args[2] == false;
                self[XHR_URL] = args[1];
                return openNative.apply(self, args);
            });
            const XMLHTTPREQUEST_SOURCE = 'XMLHttpRequest.send';
            const fetchTaskAborting = zoneSymbol('fetchTaskAborting');
            const fetchTaskScheduling = zoneSymbol('fetchTaskScheduling');
            const sendNative = patchMethod(XMLHttpRequestPrototype, 'send', () => function (self, args) {
                if (Zone.current[fetchTaskScheduling] === true) {
                    // a fetch is scheduling, so we are using xhr to polyfill fetch
                    // and because we already schedule macroTask for fetch, we should
                    // not schedule a macroTask for xhr again
                    return sendNative.apply(self, args);
                }
                if (self[XHR_SYNC]) {
                    // if the XHR is sync there is no task to schedule, just execute the code.
                    return sendNative.apply(self, args);
                }
                else {
                    const options = { target: self, url: self[XHR_URL], isPeriodic: false, args: args, aborted: false };
                    const task = scheduleMacroTaskWithCurrentZone(XMLHTTPREQUEST_SOURCE, placeholderCallback, options, scheduleTask, clearTask);
                    if (self && self[XHR_ERROR_BEFORE_SCHEDULED] === true && !options.aborted &&
                        task.state === SCHEDULED) {
                        // xhr request throw error when send
                        // we should invoke task instead of leaving a scheduled
                        // pending macroTask
                        task.invoke();
                    }
                }
            });
            const abortNative = patchMethod(XMLHttpRequestPrototype, 'abort', () => function (self, args) {
                const task = findPendingTask(self);
                if (task && typeof task.type == 'string') {
                    // If the XHR has already completed, do nothing.
                    // If the XHR has already been aborted, do nothing.
                    // Fix #569, call abort multiple times before done will cause
                    // macroTask task count be negative number
                    if (task.cancelFn == null || (task.data && task.data.aborted)) {
                        return;
                    }
                    task.zone.cancelTask(task);
                }
                else if (Zone.current[fetchTaskAborting] === true) {
                    // the abort is called from fetch polyfill, we need to call native abort of XHR.
                    return abortNative.apply(self, args);
                }
                // Otherwise, we are trying to abort an XHR which has not yet been sent, so there is no
                // task
                // to cancel. Do nothing.
            });
        }
    });
    Zone.__load_patch('geolocation', (global) => {
        /// GEO_LOCATION
        if (global['navigator'] && global['navigator'].geolocation) {
            patchPrototype(global['navigator'].geolocation, ['getCurrentPosition', 'watchPosition']);
        }
    });
    Zone.__load_patch('PromiseRejectionEvent', (global, Zone) => {
        // handle unhandled promise rejection
        function findPromiseRejectionHandler(evtName) {
            return function (e) {
                const eventTasks = findEventTasks(global, evtName);
                eventTasks.forEach(eventTask => {
                    // windows has added unhandledrejection event listener
                    // trigger the event listener
                    const PromiseRejectionEvent = global['PromiseRejectionEvent'];
                    if (PromiseRejectionEvent) {
                        const evt = new PromiseRejectionEvent(evtName, { promise: e.promise, reason: e.rejection });
                        eventTask.invoke(evt);
                    }
                });
            };
        }
        if (global['PromiseRejectionEvent']) {
            Zone[zoneSymbol('unhandledPromiseRejectionHandler')] =
                findPromiseRejectionHandler('unhandledrejection');
            Zone[zoneSymbol('rejectionHandledHandler')] =
                findPromiseRejectionHandler('rejectionhandled');
        }
    });

})));


/***/ }),

/***/ "./src/$$_lazy_route_resource lazy recursive":
/*!**********************************************************!*\
  !*** ./src/$$_lazy_route_resource lazy namespace object ***!
  \**********************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

function webpackEmptyAsyncContext(req) {
	// Here Promise.resolve().then() is used instead of new Promise() to prevent
	// uncaught exception popping up in devtools
	return Promise.resolve().then(function() {
		var e = new Error("Cannot find module '" + req + "'");
		e.code = 'MODULE_NOT_FOUND';
		throw e;
	});
}
webpackEmptyAsyncContext.keys = function() { return []; };
webpackEmptyAsyncContext.resolve = webpackEmptyAsyncContext;
module.exports = webpackEmptyAsyncContext;
webpackEmptyAsyncContext.id = "./src/$$_lazy_route_resource lazy recursive";

/***/ }),

/***/ "./src/app/account/account.component.css":
/*!***********************************************!*\
  !*** ./src/app/account/account.component.css ***!
  \***********************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony default export */ __webpack_exports__["default"] = ("body {\n    font-family: 'Roboto', sans-serif;\n}\n\n.container {\n    width: 600px;\n    height: 350px;\n    position: absolute;\n    top: 50%;\n    left: 50%;\n    transform: translate(-50%, -50%);\n    display: inline-flex;\n}\n\n.backbox {\n    background-color: white;\n    width: 100%;\n    height: 80%;\n    position: absolute;\n    transform: translate(0,-50%);\n    top: 50%;\n    display: inline-flex;\n}\n\n.frontbox {\n    background-color: #60A4FF;\n    border-radius: 20px;\n    height: 100%;\n    width: 50%;\n    right: 0;\n    z-index: 10;\n    position: absolute;\n    margin-right: 3%;\n    margin-left: 3%;\n    transition: right .8s ease-in-out;\n}\n\n.moving {\n    right: 45%;\n}\n\n.center {\n    right: 21%;\n}\n\n.profileicon {\n    width: 30%;\n    position: absolute;\n    left: 35%;\n    top: 15%;\n}\n\n.loggedin {\n    text-align: center;\n}\n\n.displayname {\n    color: white;\n    top: 50%;\n    left: 0px;\n    width: 100%;\n    position: absolute;\n}\n\n.loginMsg, .signupMsg {\n    width: 50%;\n    height: 100%;\n    font-size: 15px;\n    box-sizing: border-box;\n}\n\n.loginMsg .title,\n    .signupMsg .title{\n        font-weight: 300;\n        font-size: 23px;\n    }\n\n.loginMsg p,\n    .signupMsg p {\n        font-weight: 100;\n    }\n\n.reset p{\n    margin-top: 30px;\n    color: white;\n    margin-bottom: 50px;\n}\n\n.textcontent {\n    color: #60A4FF;\n    margin-top: 65px;\n    margin-left: 12%;\n}\n\n.textcontent p {\n        color: #60A4FF;\n    }\n\n.loginMsg button,\n.signupMsg button{\n    background-color: #60A4FF;\n    border: 2px solid white;\n    border-radius: 10px;\n    color: white;\n    font-size: 12px;\n    box-sizing: content-box;\n    font-weight: 300;\n    padding: 10px;\n    margin-top: 12px;\n    margin-left: 15px;\n}\n\n.login, .signup, .reset {\n    padding: 20px;\n    text-align: center;\n}\n\n.login h2,\n    .signup h2,\n    .reset h2 {\n        color: white;\n        font-size: 22px;\n    }\n\n.inputbox {\n    margin-top: 30px;\n}\n\ninput {\n    display: block;\n    width: 100%;\n    height: 40px;\n    background-color: white;\n    border: none;\n    margin-bottom: 20px;\n    font-size: 12px;\n    border-radius: 7px;\n    padding-left: 10px;\n}\n\n.frontbutton, .leftbutton {\n    background-color: white;\n    border: none;\n    color: #60A4FF;\n    font-size: 12px;\n    font-weight: 300;\n    box-sizing: content-box;\n    padding: 10px;\n    border-radius: 10px;\n    width: 60px;\n    position: absolute;\n    right: 30px;\n    bottom: 30px;\n    cursor: pointer;\n}\n\n.leftbutton {\n    left: 30px;\n}\n\n.login p {\n    cursor: pointer;\n    color: white;\n    font-size: 15px;\n}\n\n.loginMsg, .signupMsg {\n    transition: opacity .8s ease-in-out;\n}\n\n.visibility {\n    opacity: 0;\n}\n\n.hide {\n    display: none;\n}\n\n.animated {\n    -webkit-animation-duration: 0.5s;\n    animation-duration: 0.5s;\n    -webkit-animation-fill-mode: both;\n    animation-fill-mode: both;\n}\n\n@-webkit-keyframes shake {\n    from, to {\n        transform: translate3d(0, 0, 0);\n    }\n\n    10%, 50%, 90% {\n        transform: translate3d(-10px, 0, 0);\n    }\n\n    30%, 70% {\n        transform: translate3d(10px, 0, 0);\n    }\n}\n\n@keyframes shake {\n    from, to {\n        transform: translate3d(0, 0, 0);\n    }\n\n    10%, 50%, 90% {\n        transform: translate3d(-10px, 0, 0);\n    }\n\n    30%, 70% {\n        transform: translate3d(10px, 0, 0);\n    }\n}\n\n.shake {\n    -webkit-animation-name: shake;\n    animation-name: shake;\n}\n\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInNyYy9hcHAvYWNjb3VudC9hY2NvdW50LmNvbXBvbmVudC5jc3MiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUE7SUFDSSxpQ0FBaUM7QUFDckM7O0FBRUE7SUFDSSxZQUFZO0lBQ1osYUFBYTtJQUNiLGtCQUFrQjtJQUNsQixRQUFRO0lBQ1IsU0FBUztJQUNULGdDQUFnQztJQUNoQyxvQkFBb0I7QUFDeEI7O0FBRUE7SUFDSSx1QkFBdUI7SUFDdkIsV0FBVztJQUNYLFdBQVc7SUFDWCxrQkFBa0I7SUFDbEIsNEJBQTRCO0lBQzVCLFFBQVE7SUFDUixvQkFBb0I7QUFDeEI7O0FBRUE7SUFDSSx5QkFBeUI7SUFDekIsbUJBQW1CO0lBQ25CLFlBQVk7SUFDWixVQUFVO0lBQ1YsUUFBUTtJQUNSLFdBQVc7SUFDWCxrQkFBa0I7SUFDbEIsZ0JBQWdCO0lBQ2hCLGVBQWU7SUFDZixpQ0FBaUM7QUFDckM7O0FBRUE7SUFDSSxVQUFVO0FBQ2Q7O0FBRUE7SUFDSSxVQUFVO0FBQ2Q7O0FBRUE7SUFDSSxVQUFVO0lBQ1Ysa0JBQWtCO0lBQ2xCLFNBQVM7SUFDVCxRQUFRO0FBQ1o7O0FBRUE7SUFDSSxrQkFBa0I7QUFDdEI7O0FBRUE7SUFDSSxZQUFZO0lBQ1osUUFBUTtJQUNSLFNBQVM7SUFDVCxXQUFXO0lBQ1gsa0JBQWtCO0FBQ3RCOztBQUVBO0lBQ0ksVUFBVTtJQUNWLFlBQVk7SUFDWixlQUFlO0lBQ2Ysc0JBQXNCO0FBQzFCOztBQUVJOztRQUVJLGdCQUFnQjtRQUNoQixlQUFlO0lBQ25COztBQUVBOztRQUVJLGdCQUFnQjtJQUNwQjs7QUFFSjtJQUNJLGdCQUFnQjtJQUNoQixZQUFZO0lBQ1osbUJBQW1CO0FBQ3ZCOztBQUVBO0lBQ0ksY0FBYztJQUNkLGdCQUFnQjtJQUNoQixnQkFBZ0I7QUFDcEI7O0FBRUk7UUFDSSxjQUFjO0lBQ2xCOztBQUVKOztJQUVJLHlCQUF5QjtJQUN6Qix1QkFBdUI7SUFDdkIsbUJBQW1CO0lBQ25CLFlBQVk7SUFDWixlQUFlO0lBQ2YsdUJBQXVCO0lBQ3ZCLGdCQUFnQjtJQUNoQixhQUFhO0lBQ2IsZ0JBQWdCO0lBQ2hCLGlCQUFpQjtBQUNyQjs7QUFFQTtJQUNJLGFBQWE7SUFDYixrQkFBa0I7QUFDdEI7O0FBRUk7OztRQUdJLFlBQVk7UUFDWixlQUFlO0lBQ25COztBQUVKO0lBQ0ksZ0JBQWdCO0FBQ3BCOztBQUVBO0lBQ0ksY0FBYztJQUNkLFdBQVc7SUFDWCxZQUFZO0lBQ1osdUJBQXVCO0lBQ3ZCLFlBQVk7SUFDWixtQkFBbUI7SUFDbkIsZUFBZTtJQUNmLGtCQUFrQjtJQUNsQixrQkFBa0I7QUFDdEI7O0FBRUE7SUFDSSx1QkFBdUI7SUFDdkIsWUFBWTtJQUNaLGNBQWM7SUFDZCxlQUFlO0lBQ2YsZ0JBQWdCO0lBQ2hCLHVCQUF1QjtJQUN2QixhQUFhO0lBQ2IsbUJBQW1CO0lBQ25CLFdBQVc7SUFDWCxrQkFBa0I7SUFDbEIsV0FBVztJQUNYLFlBQVk7SUFDWixlQUFlO0FBQ25COztBQUVBO0lBQ0ksVUFBVTtBQUNkOztBQUVBO0lBQ0ksZUFBZTtJQUNmLFlBQVk7SUFDWixlQUFlO0FBQ25COztBQUVBO0lBQ0ksbUNBQW1DO0FBQ3ZDOztBQUVBO0lBQ0ksVUFBVTtBQUNkOztBQUVBO0lBQ0ksYUFBYTtBQUNqQjs7QUFFQTtJQUNJLGdDQUFnQztJQUNoQyx3QkFBd0I7SUFDeEIsaUNBQWlDO0lBQ2pDLHlCQUF5QjtBQUM3Qjs7QUFFQTtJQUNJO1FBRUksK0JBQStCO0lBQ25DOztJQUVBO1FBRUksbUNBQW1DO0lBQ3ZDOztJQUVBO1FBRUksa0NBQWtDO0lBQ3RDO0FBQ0o7O0FBR0E7SUFDSTtRQUVJLCtCQUErQjtJQUNuQzs7SUFFQTtRQUVJLG1DQUFtQztJQUN2Qzs7SUFFQTtRQUVJLGtDQUFrQztJQUN0QztBQUNKOztBQUdBO0lBQ0ksNkJBQTZCO0lBQzdCLHFCQUFxQjtBQUN6QiIsImZpbGUiOiJzcmMvYXBwL2FjY291bnQvYWNjb3VudC5jb21wb25lbnQuY3NzIiwic291cmNlc0NvbnRlbnQiOlsiYm9keSB7XG4gICAgZm9udC1mYW1pbHk6ICdSb2JvdG8nLCBzYW5zLXNlcmlmO1xufVxuXG4uY29udGFpbmVyIHtcbiAgICB3aWR0aDogNjAwcHg7XG4gICAgaGVpZ2h0OiAzNTBweDtcbiAgICBwb3NpdGlvbjogYWJzb2x1dGU7XG4gICAgdG9wOiA1MCU7XG4gICAgbGVmdDogNTAlO1xuICAgIHRyYW5zZm9ybTogdHJhbnNsYXRlKC01MCUsIC01MCUpO1xuICAgIGRpc3BsYXk6IGlubGluZS1mbGV4O1xufVxuXG4uYmFja2JveCB7XG4gICAgYmFja2dyb3VuZC1jb2xvcjogd2hpdGU7XG4gICAgd2lkdGg6IDEwMCU7XG4gICAgaGVpZ2h0OiA4MCU7XG4gICAgcG9zaXRpb246IGFic29sdXRlO1xuICAgIHRyYW5zZm9ybTogdHJhbnNsYXRlKDAsLTUwJSk7XG4gICAgdG9wOiA1MCU7XG4gICAgZGlzcGxheTogaW5saW5lLWZsZXg7XG59XG5cbi5mcm9udGJveCB7XG4gICAgYmFja2dyb3VuZC1jb2xvcjogIzYwQTRGRjtcbiAgICBib3JkZXItcmFkaXVzOiAyMHB4O1xuICAgIGhlaWdodDogMTAwJTtcbiAgICB3aWR0aDogNTAlO1xuICAgIHJpZ2h0OiAwO1xuICAgIHotaW5kZXg6IDEwO1xuICAgIHBvc2l0aW9uOiBhYnNvbHV0ZTtcbiAgICBtYXJnaW4tcmlnaHQ6IDMlO1xuICAgIG1hcmdpbi1sZWZ0OiAzJTtcbiAgICB0cmFuc2l0aW9uOiByaWdodCAuOHMgZWFzZS1pbi1vdXQ7XG59XG5cbi5tb3Zpbmcge1xuICAgIHJpZ2h0OiA0NSU7XG59XG5cbi5jZW50ZXIge1xuICAgIHJpZ2h0OiAyMSU7XG59XG5cbi5wcm9maWxlaWNvbiB7XG4gICAgd2lkdGg6IDMwJTtcbiAgICBwb3NpdGlvbjogYWJzb2x1dGU7XG4gICAgbGVmdDogMzUlO1xuICAgIHRvcDogMTUlO1xufVxuXG4ubG9nZ2VkaW4ge1xuICAgIHRleHQtYWxpZ246IGNlbnRlcjtcbn1cblxuLmRpc3BsYXluYW1lIHtcbiAgICBjb2xvcjogd2hpdGU7XG4gICAgdG9wOiA1MCU7XG4gICAgbGVmdDogMHB4O1xuICAgIHdpZHRoOiAxMDAlO1xuICAgIHBvc2l0aW9uOiBhYnNvbHV0ZTtcbn1cblxuLmxvZ2luTXNnLCAuc2lnbnVwTXNnIHtcbiAgICB3aWR0aDogNTAlO1xuICAgIGhlaWdodDogMTAwJTtcbiAgICBmb250LXNpemU6IDE1cHg7XG4gICAgYm94LXNpemluZzogYm9yZGVyLWJveDtcbn1cblxuICAgIC5sb2dpbk1zZyAudGl0bGUsXG4gICAgLnNpZ251cE1zZyAudGl0bGV7XG4gICAgICAgIGZvbnQtd2VpZ2h0OiAzMDA7XG4gICAgICAgIGZvbnQtc2l6ZTogMjNweDtcbiAgICB9XG5cbiAgICAubG9naW5Nc2cgcCxcbiAgICAuc2lnbnVwTXNnIHAge1xuICAgICAgICBmb250LXdlaWdodDogMTAwO1xuICAgIH1cblxuLnJlc2V0IHB7XG4gICAgbWFyZ2luLXRvcDogMzBweDtcbiAgICBjb2xvcjogd2hpdGU7XG4gICAgbWFyZ2luLWJvdHRvbTogNTBweDtcbn1cblxuLnRleHRjb250ZW50IHtcbiAgICBjb2xvcjogIzYwQTRGRjtcbiAgICBtYXJnaW4tdG9wOiA2NXB4O1xuICAgIG1hcmdpbi1sZWZ0OiAxMiU7XG59XG5cbiAgICAudGV4dGNvbnRlbnQgcCB7XG4gICAgICAgIGNvbG9yOiAjNjBBNEZGO1xuICAgIH1cblxuLmxvZ2luTXNnIGJ1dHRvbixcbi5zaWdudXBNc2cgYnV0dG9ue1xuICAgIGJhY2tncm91bmQtY29sb3I6ICM2MEE0RkY7XG4gICAgYm9yZGVyOiAycHggc29saWQgd2hpdGU7XG4gICAgYm9yZGVyLXJhZGl1czogMTBweDtcbiAgICBjb2xvcjogd2hpdGU7XG4gICAgZm9udC1zaXplOiAxMnB4O1xuICAgIGJveC1zaXppbmc6IGNvbnRlbnQtYm94O1xuICAgIGZvbnQtd2VpZ2h0OiAzMDA7XG4gICAgcGFkZGluZzogMTBweDtcbiAgICBtYXJnaW4tdG9wOiAxMnB4O1xuICAgIG1hcmdpbi1sZWZ0OiAxNXB4O1xufVxuXG4ubG9naW4sIC5zaWdudXAsIC5yZXNldCB7XG4gICAgcGFkZGluZzogMjBweDtcbiAgICB0ZXh0LWFsaWduOiBjZW50ZXI7XG59XG5cbiAgICAubG9naW4gaDIsXG4gICAgLnNpZ251cCBoMixcbiAgICAucmVzZXQgaDIge1xuICAgICAgICBjb2xvcjogd2hpdGU7XG4gICAgICAgIGZvbnQtc2l6ZTogMjJweDtcbiAgICB9XG5cbi5pbnB1dGJveCB7XG4gICAgbWFyZ2luLXRvcDogMzBweDtcbn1cblxuaW5wdXQge1xuICAgIGRpc3BsYXk6IGJsb2NrO1xuICAgIHdpZHRoOiAxMDAlO1xuICAgIGhlaWdodDogNDBweDtcbiAgICBiYWNrZ3JvdW5kLWNvbG9yOiB3aGl0ZTtcbiAgICBib3JkZXI6IG5vbmU7XG4gICAgbWFyZ2luLWJvdHRvbTogMjBweDtcbiAgICBmb250LXNpemU6IDEycHg7XG4gICAgYm9yZGVyLXJhZGl1czogN3B4O1xuICAgIHBhZGRpbmctbGVmdDogMTBweDtcbn1cblxuLmZyb250YnV0dG9uLCAubGVmdGJ1dHRvbiB7XG4gICAgYmFja2dyb3VuZC1jb2xvcjogd2hpdGU7XG4gICAgYm9yZGVyOiBub25lO1xuICAgIGNvbG9yOiAjNjBBNEZGO1xuICAgIGZvbnQtc2l6ZTogMTJweDtcbiAgICBmb250LXdlaWdodDogMzAwO1xuICAgIGJveC1zaXppbmc6IGNvbnRlbnQtYm94O1xuICAgIHBhZGRpbmc6IDEwcHg7XG4gICAgYm9yZGVyLXJhZGl1czogMTBweDtcbiAgICB3aWR0aDogNjBweDtcbiAgICBwb3NpdGlvbjogYWJzb2x1dGU7XG4gICAgcmlnaHQ6IDMwcHg7XG4gICAgYm90dG9tOiAzMHB4O1xuICAgIGN1cnNvcjogcG9pbnRlcjtcbn1cblxuLmxlZnRidXR0b24ge1xuICAgIGxlZnQ6IDMwcHg7XG59XG5cbi5sb2dpbiBwIHtcbiAgICBjdXJzb3I6IHBvaW50ZXI7XG4gICAgY29sb3I6IHdoaXRlO1xuICAgIGZvbnQtc2l6ZTogMTVweDtcbn1cblxuLmxvZ2luTXNnLCAuc2lnbnVwTXNnIHtcbiAgICB0cmFuc2l0aW9uOiBvcGFjaXR5IC44cyBlYXNlLWluLW91dDtcbn1cblxuLnZpc2liaWxpdHkge1xuICAgIG9wYWNpdHk6IDA7XG59XG5cbi5oaWRlIHtcbiAgICBkaXNwbGF5OiBub25lO1xufVxuXG4uYW5pbWF0ZWQge1xuICAgIC13ZWJraXQtYW5pbWF0aW9uLWR1cmF0aW9uOiAwLjVzO1xuICAgIGFuaW1hdGlvbi1kdXJhdGlvbjogMC41cztcbiAgICAtd2Via2l0LWFuaW1hdGlvbi1maWxsLW1vZGU6IGJvdGg7XG4gICAgYW5pbWF0aW9uLWZpbGwtbW9kZTogYm90aDtcbn1cblxuQC13ZWJraXQta2V5ZnJhbWVzIHNoYWtlIHtcbiAgICBmcm9tLCB0byB7XG4gICAgICAgIC13ZWJraXQtdHJhbnNmb3JtOiB0cmFuc2xhdGUzZCgwLCAwLCAwKTtcbiAgICAgICAgdHJhbnNmb3JtOiB0cmFuc2xhdGUzZCgwLCAwLCAwKTtcbiAgICB9XG5cbiAgICAxMCUsIDUwJSwgOTAlIHtcbiAgICAgICAgLXdlYmtpdC10cmFuc2Zvcm06IHRyYW5zbGF0ZTNkKC0xMHB4LCAwLCAwKTtcbiAgICAgICAgdHJhbnNmb3JtOiB0cmFuc2xhdGUzZCgtMTBweCwgMCwgMCk7XG4gICAgfVxuXG4gICAgMzAlLCA3MCUge1xuICAgICAgICAtd2Via2l0LXRyYW5zZm9ybTogdHJhbnNsYXRlM2QoMTBweCwgMCwgMCk7XG4gICAgICAgIHRyYW5zZm9ybTogdHJhbnNsYXRlM2QoMTBweCwgMCwgMCk7XG4gICAgfVxufVxuXG5cbkBrZXlmcmFtZXMgc2hha2Uge1xuICAgIGZyb20sIHRvIHtcbiAgICAgICAgLXdlYmtpdC10cmFuc2Zvcm06IHRyYW5zbGF0ZTNkKDAsIDAsIDApO1xuICAgICAgICB0cmFuc2Zvcm06IHRyYW5zbGF0ZTNkKDAsIDAsIDApO1xuICAgIH1cblxuICAgIDEwJSwgNTAlLCA5MCUge1xuICAgICAgICAtd2Via2l0LXRyYW5zZm9ybTogdHJhbnNsYXRlM2QoLTEwcHgsIDAsIDApO1xuICAgICAgICB0cmFuc2Zvcm06IHRyYW5zbGF0ZTNkKC0xMHB4LCAwLCAwKTtcbiAgICB9XG5cbiAgICAzMCUsIDcwJSB7XG4gICAgICAgIC13ZWJraXQtdHJhbnNmb3JtOiB0cmFuc2xhdGUzZCgxMHB4LCAwLCAwKTtcbiAgICAgICAgdHJhbnNmb3JtOiB0cmFuc2xhdGUzZCgxMHB4LCAwLCAwKTtcbiAgICB9XG59XG5cblxuLnNoYWtlIHtcbiAgICAtd2Via2l0LWFuaW1hdGlvbi1uYW1lOiBzaGFrZTtcbiAgICBhbmltYXRpb24tbmFtZTogc2hha2U7XG59XG4iXX0= */");

/***/ }),

/***/ "./src/app/account/account.component.ts":
/*!**********************************************!*\
  !*** ./src/app/account/account.component.ts ***!
  \**********************************************/
/*! exports provided: AccountComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "AccountComponent", function() { return AccountComponent; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/__ivy_ngcc__/fesm2015/core.js");
/* harmony import */ var _service_auth_service__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../service/auth.service */ "./src/app/service/auth.service.ts");
var __decorate = (undefined && undefined.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (undefined && undefined.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __awaiter = (undefined && undefined.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (undefined && undefined.__importDefault) || function (mod) {
  return (mod && mod.__esModule) ? mod : { "default": mod };
};


let AccountComponent = class AccountComponent {
    constructor(authService) {
        this.authService = authService;
        this.email = "";
        this.password = "";
        this.firstName = "";
        this.lastName = "";
        this.code = "";
        this.shake = false;
        this.loginMsgVisibility = false;
        this.signupMsgVisibility = true;
        this.loggedinMsgVisibility = true;
        this.frontBoxMoving = false;
        this.loggedinHide = true;
        this.loginHide = false;
        this.signupHide = true;
        this.resetHide = true;
        this.center = false;
    }
    //error = "test";
    ngOnInit() {
        this.authService.currentAuthStatus.subscribe((authStatus) => {
            this.user = authStatus;
            if (this.user) {
                this.loggedinMode();
            }
            else {
                this.loginMode();
            }
        });
    }
    signup() {
        return __awaiter(this, void 0, void 0, function* () {
            this.clearError();
            if (this.firstName.length == 0 || this.lastName.length == 0 || this.email.length == 0 || this.password.length == 0 || this.code.length == 0) {
                this.authService.error = "Please fill all fields.";
                this.shake = true;
                setTimeout(() => this.shake = false, 1000);
                return;
            }
            if (!(yield this.authService.signup(this.firstName, this.lastName, this.email, this.password, this.code))) {
                this.shake = true;
                setTimeout(() => this.shake = false, 1000);
            }
            this.email = this.password = this.code = '';
        });
    }
    login() {
        return __awaiter(this, void 0, void 0, function* () {
            if (!(yield this.authService.login(this.email, this.password))) {
                this.shake = true;
                setTimeout(() => this.shake = false, 1000);
            }
            this.email = this.password = '';
        });
    }
    logout() {
        this.authService.logout();
    }
    reset() {
        this.authService.reset(this.email);
        this.loginMode();
    }
    resetMode() {
        this.clearError();
        this.loginMsgVisibility = true;
        this.signupMsgVisibility = true;
        this.loginHide = true;
        this.signupHide = true;
        this.loggedinHide = true;
        this.resetHide = false;
        this.frontBoxMoving = false;
        this.center = true;
    }
    signupMode() {
        this.clearError();
        this.loginMsgVisibility = true;
        this.signupMsgVisibility = false;
        this.loginHide = true;
        this.signupHide = false;
        this.loggedinHide = true;
        this.resetHide = true;
        this.frontBoxMoving = true;
        this.center = false;
    }
    loginMode() {
        this.clearError();
        this.loginMsgVisibility = false;
        this.signupMsgVisibility = true;
        this.loginHide = false;
        this.signupHide = true;
        this.loggedinHide = true;
        this.resetHide = true;
        this.frontBoxMoving = false;
        this.center = false;
    }
    loggedinMode() {
        this.clearError();
        //console.log("hiar");
        this.loginMsgVisibility = true;
        this.signupMsgVisibility = true;
        this.loginHide = true;
        this.signupHide = true;
        this.loggedinHide = false;
        this.resetHide = true;
        this.frontBoxMoving = false;
        this.center = true;
    }
    clearError() {
        this.authService.error = "";
    }
};
AccountComponent.ctorParameters = () => [
    { type: _service_auth_service__WEBPACK_IMPORTED_MODULE_1__["AuthService"] }
];
AccountComponent = __decorate([
    Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["Component"])({
        selector: 'app-account',
        template: __importDefault(__webpack_require__(/*! raw-loader!./account.component.html */ "./node_modules/raw-loader/dist/cjs.js!./src/app/account/account.component.html")).default,
        styles: [__importDefault(__webpack_require__(/*! ./account.component.css */ "./src/app/account/account.component.css")).default, __importDefault(__webpack_require__(/*! ../volunteer-directory/volunteer-directory.component.scss */ "./src/app/volunteer-directory/volunteer-directory.component.scss")).default]
    }),
    __metadata("design:paramtypes", [_service_auth_service__WEBPACK_IMPORTED_MODULE_1__["AuthService"]])
], AccountComponent);



/***/ }),

/***/ "./src/app/app-routing.module.ts":
/*!***************************************!*\
  !*** ./src/app/app-routing.module.ts ***!
  \***************************************/
/*! exports provided: AppRoutingModule */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "AppRoutingModule", function() { return AppRoutingModule; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/__ivy_ngcc__/fesm2015/core.js");
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/router */ "./node_modules/@angular/router/__ivy_ngcc__/fesm2015/router.js");
/* harmony import */ var _detail_detail_routing_module__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./detail/detail-routing.module */ "./src/app/detail/detail-routing.module.ts");
var __decorate = (undefined && undefined.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __importDefault = (undefined && undefined.__importDefault) || function (mod) {
  return (mod && mod.__esModule) ? mod : { "default": mod };
};



const routes = [
    {
        path: '',
        redirectTo: 'home',
        pathMatch: 'full'
    }
];
let AppRoutingModule = class AppRoutingModule {
};
AppRoutingModule = __decorate([
    Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["NgModule"])({
        imports: [
            _angular_router__WEBPACK_IMPORTED_MODULE_1__["RouterModule"].forRoot(routes),
            // HomeRoutingModule,
            _detail_detail_routing_module__WEBPACK_IMPORTED_MODULE_2__["DetailRoutingModule"]
        ],
        exports: [_angular_router__WEBPACK_IMPORTED_MODULE_1__["RouterModule"]]
    })
], AppRoutingModule);



/***/ }),

/***/ "./src/app/app.component.scss":
/*!************************************!*\
  !*** ./src/app/app.component.scss ***!
  \************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony default export */ __webpack_exports__["default"] = ("\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IiIsImZpbGUiOiJzcmMvYXBwL2FwcC5jb21wb25lbnQuc2NzcyJ9 */");

/***/ }),

/***/ "./src/app/app.component.ts":
/*!**********************************!*\
  !*** ./src/app/app.component.ts ***!
  \**********************************/
/*! exports provided: AppComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "AppComponent", function() { return AppComponent; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/__ivy_ngcc__/fesm2015/core.js");
/* harmony import */ var _core_services__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./core/services */ "./src/app/core/services/index.ts");
/* harmony import */ var _ngx_translate_core__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @ngx-translate/core */ "./node_modules/@ngx-translate/core/__ivy_ngcc__/fesm2015/ngx-translate-core.js");
/* harmony import */ var _environments_environment__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../environments/environment */ "./src/environments/environment.ts");
var __decorate = (undefined && undefined.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (undefined && undefined.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __importDefault = (undefined && undefined.__importDefault) || function (mod) {
  return (mod && mod.__esModule) ? mod : { "default": mod };
};




let AppComponent = class AppComponent {
    constructor(electronService, translate) {
        this.electronService = electronService;
        this.translate = translate;
        translate.setDefaultLang('en');
        console.log('AppConfig', _environments_environment__WEBPACK_IMPORTED_MODULE_3__["AppConfig"]);
        if (electronService.isElectron) {
            console.log(process.env);
            console.log('Mode electron');
            console.log('Electron ipcRenderer', electronService.ipcRenderer);
            console.log('NodeJS childProcess', electronService.childProcess);
        }
        else {
            console.log('Mode web');
        }
    }
    ngOnInit() {
        $(document).ready(() => {
            console.log('The document ready!');
        });
        //set active users
    }
};
AppComponent.ctorParameters = () => [
    { type: _core_services__WEBPACK_IMPORTED_MODULE_1__["ElectronService"] },
    { type: _ngx_translate_core__WEBPACK_IMPORTED_MODULE_2__["TranslateService"] }
];
AppComponent = __decorate([
    Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["Component"])({
        selector: 'app-root',
        template: __importDefault(__webpack_require__(/*! raw-loader!./app.component.html */ "./node_modules/raw-loader/dist/cjs.js!./src/app/app.component.html")).default,
        styles: [__importDefault(__webpack_require__(/*! ./app.component.scss */ "./src/app/app.component.scss")).default]
    }),
    __metadata("design:paramtypes", [_core_services__WEBPACK_IMPORTED_MODULE_1__["ElectronService"],
        _ngx_translate_core__WEBPACK_IMPORTED_MODULE_2__["TranslateService"]])
], AppComponent);



/***/ }),

/***/ "./src/app/app.module.ts":
/*!*******************************!*\
  !*** ./src/app/app.module.ts ***!
  \*******************************/
/*! exports provided: HttpLoaderFactory, AppModule */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "HttpLoaderFactory", function() { return HttpLoaderFactory; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "AppModule", function() { return AppModule; });
/* harmony import */ var reflect_metadata__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! reflect-metadata */ "./node_modules/reflect-metadata/Reflect.js");
/* harmony import */ var reflect_metadata__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(reflect_metadata__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _polyfills__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../polyfills */ "./src/polyfills.ts");
/* harmony import */ var _angular_platform_browser__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/platform-browser */ "./node_modules/@angular/platform-browser/__ivy_ngcc__/fesm2015/platform-browser.js");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/__ivy_ngcc__/fesm2015/core.js");
/* harmony import */ var _angular_forms__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @angular/forms */ "./node_modules/@angular/forms/__ivy_ngcc__/fesm2015/forms.js");
/* harmony import */ var _angular_common_http__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! @angular/common/http */ "./node_modules/@angular/common/__ivy_ngcc__/fesm2015/http.js");
/* harmony import */ var _core_core_module__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./core/core.module */ "./src/app/core/core.module.ts");
/* harmony import */ var _shared_shared_module__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ./shared/shared.module */ "./src/app/shared/shared.module.ts");
/* harmony import */ var _environments_environment__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ../environments/environment */ "./src/environments/environment.ts");
/* harmony import */ var _app_routing_module__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! ./app-routing.module */ "./src/app/app-routing.module.ts");
/* harmony import */ var _angular_fire__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! @angular/fire */ "./node_modules/@angular/fire/__ivy_ngcc__/fesm2015/angular-fire.js");
/* harmony import */ var _angular_fire_auth__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(/*! @angular/fire/auth */ "./node_modules/@angular/fire/__ivy_ngcc__/fesm2015/angular-fire-auth.js");
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_12__ = __webpack_require__(/*! @angular/router */ "./node_modules/@angular/router/__ivy_ngcc__/fesm2015/router.js");
/* harmony import */ var _ngx_translate_core__WEBPACK_IMPORTED_MODULE_13__ = __webpack_require__(/*! @ngx-translate/core */ "./node_modules/@ngx-translate/core/__ivy_ngcc__/fesm2015/ngx-translate-core.js");
/* harmony import */ var _ngx_translate_http_loader__WEBPACK_IMPORTED_MODULE_14__ = __webpack_require__(/*! @ngx-translate/http-loader */ "./node_modules/@ngx-translate/http-loader/__ivy_ngcc__/fesm2015/ngx-translate-http-loader.js");
/* harmony import */ var _detail_detail_module__WEBPACK_IMPORTED_MODULE_15__ = __webpack_require__(/*! ./detail/detail.module */ "./src/app/detail/detail.module.ts");
/* harmony import */ var _app_component__WEBPACK_IMPORTED_MODULE_16__ = __webpack_require__(/*! ./app.component */ "./src/app/app.component.ts");
/* harmony import */ var _volunteer_directory_volunteer_directory_component__WEBPACK_IMPORTED_MODULE_17__ = __webpack_require__(/*! ./volunteer-directory/volunteer-directory.component */ "./src/app/volunteer-directory/volunteer-directory.component.ts");
/* harmony import */ var _angular_platform_browser_animations__WEBPACK_IMPORTED_MODULE_18__ = __webpack_require__(/*! @angular/platform-browser/animations */ "./node_modules/@angular/platform-browser/__ivy_ngcc__/fesm2015/animations.js");
/* harmony import */ var _angular_material_checkbox__WEBPACK_IMPORTED_MODULE_19__ = __webpack_require__(/*! @angular/material/checkbox */ "./node_modules/@angular/material/__ivy_ngcc__/fesm2015/checkbox.js");
/* harmony import */ var _angular_material_button__WEBPACK_IMPORTED_MODULE_20__ = __webpack_require__(/*! @angular/material/button */ "./node_modules/@angular/material/__ivy_ngcc__/fesm2015/button.js");
/* harmony import */ var _angular_material_input__WEBPACK_IMPORTED_MODULE_21__ = __webpack_require__(/*! @angular/material/input */ "./node_modules/@angular/material/__ivy_ngcc__/fesm2015/input.js");
/* harmony import */ var _angular_material_autocomplete__WEBPACK_IMPORTED_MODULE_22__ = __webpack_require__(/*! @angular/material/autocomplete */ "./node_modules/@angular/material/__ivy_ngcc__/fesm2015/autocomplete.js");
/* harmony import */ var _angular_material_datepicker__WEBPACK_IMPORTED_MODULE_23__ = __webpack_require__(/*! @angular/material/datepicker */ "./node_modules/@angular/material/__ivy_ngcc__/fesm2015/datepicker.js");
/* harmony import */ var _angular_material_form_field__WEBPACK_IMPORTED_MODULE_24__ = __webpack_require__(/*! @angular/material/form-field */ "./node_modules/@angular/material/__ivy_ngcc__/fesm2015/form-field.js");
/* harmony import */ var _angular_material_radio__WEBPACK_IMPORTED_MODULE_25__ = __webpack_require__(/*! @angular/material/radio */ "./node_modules/@angular/material/__ivy_ngcc__/fesm2015/radio.js");
/* harmony import */ var _angular_material_select__WEBPACK_IMPORTED_MODULE_26__ = __webpack_require__(/*! @angular/material/select */ "./node_modules/@angular/material/__ivy_ngcc__/fesm2015/select.js");
/* harmony import */ var _angular_material_slider__WEBPACK_IMPORTED_MODULE_27__ = __webpack_require__(/*! @angular/material/slider */ "./node_modules/@angular/material/__ivy_ngcc__/fesm2015/slider.js");
/* harmony import */ var _angular_material_slide_toggle__WEBPACK_IMPORTED_MODULE_28__ = __webpack_require__(/*! @angular/material/slide-toggle */ "./node_modules/@angular/material/__ivy_ngcc__/fesm2015/slide-toggle.js");
/* harmony import */ var _angular_material_menu__WEBPACK_IMPORTED_MODULE_29__ = __webpack_require__(/*! @angular/material/menu */ "./node_modules/@angular/material/__ivy_ngcc__/fesm2015/menu.js");
/* harmony import */ var _angular_material_sidenav__WEBPACK_IMPORTED_MODULE_30__ = __webpack_require__(/*! @angular/material/sidenav */ "./node_modules/@angular/material/__ivy_ngcc__/fesm2015/sidenav.js");
/* harmony import */ var _angular_material_toolbar__WEBPACK_IMPORTED_MODULE_31__ = __webpack_require__(/*! @angular/material/toolbar */ "./node_modules/@angular/material/__ivy_ngcc__/fesm2015/toolbar.js");
/* harmony import */ var _angular_material_list__WEBPACK_IMPORTED_MODULE_32__ = __webpack_require__(/*! @angular/material/list */ "./node_modules/@angular/material/__ivy_ngcc__/fesm2015/list.js");
/* harmony import */ var _angular_material_grid_list__WEBPACK_IMPORTED_MODULE_33__ = __webpack_require__(/*! @angular/material/grid-list */ "./node_modules/@angular/material/__ivy_ngcc__/fesm2015/grid-list.js");
/* harmony import */ var _angular_material_card__WEBPACK_IMPORTED_MODULE_34__ = __webpack_require__(/*! @angular/material/card */ "./node_modules/@angular/material/__ivy_ngcc__/fesm2015/card.js");
/* harmony import */ var _angular_material_stepper__WEBPACK_IMPORTED_MODULE_35__ = __webpack_require__(/*! @angular/material/stepper */ "./node_modules/@angular/material/__ivy_ngcc__/fesm2015/stepper.js");
/* harmony import */ var _angular_material_tabs__WEBPACK_IMPORTED_MODULE_36__ = __webpack_require__(/*! @angular/material/tabs */ "./node_modules/@angular/material/__ivy_ngcc__/fesm2015/tabs.js");
/* harmony import */ var _angular_material_expansion__WEBPACK_IMPORTED_MODULE_37__ = __webpack_require__(/*! @angular/material/expansion */ "./node_modules/@angular/material/__ivy_ngcc__/fesm2015/expansion.js");
/* harmony import */ var _angular_material_button_toggle__WEBPACK_IMPORTED_MODULE_38__ = __webpack_require__(/*! @angular/material/button-toggle */ "./node_modules/@angular/material/__ivy_ngcc__/fesm2015/button-toggle.js");
/* harmony import */ var _angular_material_chips__WEBPACK_IMPORTED_MODULE_39__ = __webpack_require__(/*! @angular/material/chips */ "./node_modules/@angular/material/__ivy_ngcc__/fesm2015/chips.js");
/* harmony import */ var _angular_material_icon__WEBPACK_IMPORTED_MODULE_40__ = __webpack_require__(/*! @angular/material/icon */ "./node_modules/@angular/material/__ivy_ngcc__/fesm2015/icon.js");
/* harmony import */ var _angular_material_progress_spinner__WEBPACK_IMPORTED_MODULE_41__ = __webpack_require__(/*! @angular/material/progress-spinner */ "./node_modules/@angular/material/__ivy_ngcc__/fesm2015/progress-spinner.js");
/* harmony import */ var _angular_material_progress_bar__WEBPACK_IMPORTED_MODULE_42__ = __webpack_require__(/*! @angular/material/progress-bar */ "./node_modules/@angular/material/__ivy_ngcc__/fesm2015/progress-bar.js");
/* harmony import */ var _angular_material_dialog__WEBPACK_IMPORTED_MODULE_43__ = __webpack_require__(/*! @angular/material/dialog */ "./node_modules/@angular/material/__ivy_ngcc__/fesm2015/dialog.js");
/* harmony import */ var _angular_material_tooltip__WEBPACK_IMPORTED_MODULE_44__ = __webpack_require__(/*! @angular/material/tooltip */ "./node_modules/@angular/material/__ivy_ngcc__/fesm2015/tooltip.js");
/* harmony import */ var _angular_material_snack_bar__WEBPACK_IMPORTED_MODULE_45__ = __webpack_require__(/*! @angular/material/snack-bar */ "./node_modules/@angular/material/__ivy_ngcc__/fesm2015/snack-bar.js");
/* harmony import */ var _angular_material_table__WEBPACK_IMPORTED_MODULE_46__ = __webpack_require__(/*! @angular/material/table */ "./node_modules/@angular/material/__ivy_ngcc__/fesm2015/table.js");
/* harmony import */ var _angular_material_sort__WEBPACK_IMPORTED_MODULE_47__ = __webpack_require__(/*! @angular/material/sort */ "./node_modules/@angular/material/__ivy_ngcc__/fesm2015/sort.js");
/* harmony import */ var _angular_material_paginator__WEBPACK_IMPORTED_MODULE_48__ = __webpack_require__(/*! @angular/material/paginator */ "./node_modules/@angular/material/__ivy_ngcc__/fesm2015/paginator.js");
/* harmony import */ var _new_user_new_user_component__WEBPACK_IMPORTED_MODULE_49__ = __webpack_require__(/*! ./new-user/new-user.component */ "./src/app/new-user/new-user.component.ts");
/* harmony import */ var _angular_material_badge__WEBPACK_IMPORTED_MODULE_50__ = __webpack_require__(/*! @angular/material/badge */ "./node_modules/@angular/material/__ivy_ngcc__/fesm2015/badge.js");
/* harmony import */ var ag_grid_angular__WEBPACK_IMPORTED_MODULE_51__ = __webpack_require__(/*! ag-grid-angular */ "./node_modules/ag-grid-angular/__ivy_ngcc__/fesm2015/ag-grid-angular.js");
/* harmony import */ var angular_bootstrap_md__WEBPACK_IMPORTED_MODULE_52__ = __webpack_require__(/*! angular-bootstrap-md */ "./node_modules/angular-bootstrap-md/__ivy_ngcc__/fesm2015/angular-bootstrap-md.js");
/* harmony import */ var _ng_bootstrap_ng_bootstrap__WEBPACK_IMPORTED_MODULE_53__ = __webpack_require__(/*! @ng-bootstrap/ng-bootstrap */ "./node_modules/@ng-bootstrap/ng-bootstrap/__ivy_ngcc__/fesm2015/ng-bootstrap.js");
/* harmony import */ var _angular_flex_layout__WEBPACK_IMPORTED_MODULE_54__ = __webpack_require__(/*! @angular/flex-layout */ "./node_modules/@angular/flex-layout/__ivy_ngcc__/esm2015/flex-layout.js");
/* harmony import */ var _angular_material_core__WEBPACK_IMPORTED_MODULE_55__ = __webpack_require__(/*! @angular/material/core */ "./node_modules/@angular/material/__ivy_ngcc__/fesm2015/core.js");
/* harmony import */ var _change_registration_code_change_registration_code_component__WEBPACK_IMPORTED_MODULE_56__ = __webpack_require__(/*! ./change-registration-code/change-registration-code.component */ "./src/app/change-registration-code/change-registration-code.component.ts");
/* harmony import */ var _mark_important_event_mark_important_event_component__WEBPACK_IMPORTED_MODULE_57__ = __webpack_require__(/*! ./mark-important-event/mark-important-event.component */ "./src/app/mark-important-event/mark-important-event.component.ts");
/* harmony import */ var _sign_up_sheet_sign_up_sheet_component__WEBPACK_IMPORTED_MODULE_58__ = __webpack_require__(/*! ./sign-up-sheet/sign-up-sheet.component */ "./src/app/sign-up-sheet/sign-up-sheet.component.ts");
/* harmony import */ var _slider_slider_component__WEBPACK_IMPORTED_MODULE_59__ = __webpack_require__(/*! ./slider/slider.component */ "./src/app/slider/slider.component.ts");
/* harmony import */ var _sign_up_sheet_add_user_to_event_add_user_to_event_component__WEBPACK_IMPORTED_MODULE_60__ = __webpack_require__(/*! ./sign-up-sheet/add-user-to-event/add-user-to-event.component */ "./src/app/sign-up-sheet/add-user-to-event/add-user-to-event.component.ts");
/* harmony import */ var _sign_up_sheet_remove_user_from_event_remove_user_from_event_component__WEBPACK_IMPORTED_MODULE_61__ = __webpack_require__(/*! ./sign-up-sheet/remove-user-from-event/remove-user-from-event.component */ "./src/app/sign-up-sheet/remove-user-from-event/remove-user-from-event.component.ts");
/* harmony import */ var _toolbar_toolbar_component__WEBPACK_IMPORTED_MODULE_62__ = __webpack_require__(/*! ./toolbar/toolbar.component */ "./src/app/toolbar/toolbar.component.ts");
/* harmony import */ var _sign_up_sheet_mark_permanent_event_mark_permanent_event_component__WEBPACK_IMPORTED_MODULE_63__ = __webpack_require__(/*! ./sign-up-sheet/mark-permanent-event/mark-permanent-event.component */ "./src/app/sign-up-sheet/mark-permanent-event/mark-permanent-event.component.ts");
/* harmony import */ var _permanent_volunteer_permanent_volunteer_component__WEBPACK_IMPORTED_MODULE_64__ = __webpack_require__(/*! ./permanent-volunteer/permanent-volunteer.component */ "./src/app/permanent-volunteer/permanent-volunteer.component.ts");
/* harmony import */ var _permanent_volunteer_directory_permanent_volunteer_directory_component__WEBPACK_IMPORTED_MODULE_65__ = __webpack_require__(/*! ./permanent-volunteer-directory/permanent-volunteer-directory.component */ "./src/app/permanent-volunteer-directory/permanent-volunteer-directory.component.ts");
/* harmony import */ var _sign_up_sheet_event_sign_up_table_event_sign_up_table_component__WEBPACK_IMPORTED_MODULE_66__ = __webpack_require__(/*! ./sign-up-sheet/event-sign-up-table/event-sign-up-table.component */ "./src/app/sign-up-sheet/event-sign-up-table/event-sign-up-table.component.ts");
/* harmony import */ var _bug_report_bug_report_component__WEBPACK_IMPORTED_MODULE_67__ = __webpack_require__(/*! ./bug-report/bug-report.component */ "./src/app/bug-report/bug-report.component.ts");
/* harmony import */ var _sign_up_sheet_staff_note_staff_note_component__WEBPACK_IMPORTED_MODULE_68__ = __webpack_require__(/*! ./sign-up-sheet/staff-note/staff-note.component */ "./src/app/sign-up-sheet/staff-note/staff-note.component.ts");
/* harmony import */ var _toolbar_notifications_notifications_component__WEBPACK_IMPORTED_MODULE_69__ = __webpack_require__(/*! ./toolbar/notifications/notifications.component */ "./src/app/toolbar/notifications/notifications.component.ts");
/* harmony import */ var _sign_up_sheet_event_note_event_note_component__WEBPACK_IMPORTED_MODULE_70__ = __webpack_require__(/*! ./sign-up-sheet/event-note/event-note.component */ "./src/app/sign-up-sheet/event-note/event-note.component.ts");
/* harmony import */ var _user_event_user_event_component__WEBPACK_IMPORTED_MODULE_71__ = __webpack_require__(/*! ./user-event/user-event.component */ "./src/app/user-event/user-event.component.ts");
/* harmony import */ var _fortawesome_angular_fontawesome__WEBPACK_IMPORTED_MODULE_72__ = __webpack_require__(/*! @fortawesome/angular-fontawesome */ "./node_modules/@fortawesome/angular-fontawesome/__ivy_ngcc__/fesm2015/angular-fontawesome.js");
/* harmony import */ var _sign_up_sheet_new_schedule_new_schedule_component__WEBPACK_IMPORTED_MODULE_73__ = __webpack_require__(/*! ./sign-up-sheet/new-schedule/new-schedule.component */ "./src/app/sign-up-sheet/new-schedule/new-schedule.component.ts");
/* harmony import */ var _week_generator_week_generator_component__WEBPACK_IMPORTED_MODULE_74__ = __webpack_require__(/*! ./week-generator/week-generator.component */ "./src/app/week-generator/week-generator.component.ts");
/* harmony import */ var _user_profile_user_profile_component__WEBPACK_IMPORTED_MODULE_75__ = __webpack_require__(/*! ./user-profile/user-profile.component */ "./src/app/user-profile/user-profile.component.ts");
/* harmony import */ var _account_account_component__WEBPACK_IMPORTED_MODULE_76__ = __webpack_require__(/*! ./account/account.component */ "./src/app/account/account.component.ts");
var __decorate = (undefined && undefined.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __importDefault = (undefined && undefined.__importDefault) || function (mod) {
  return (mod && mod.__esModule) ? mod : { "default": mod };
};












// NG Translate



//import { HomeModule } from './home/home.module';



//materialImports
//Angular Material Components




































// AoT requires an exported function for factories



















//import {HomeComponent} from './home/home.component';





//translate:
function HttpLoaderFactory(http) {
    return new _ngx_translate_http_loader__WEBPACK_IMPORTED_MODULE_14__["TranslateHttpLoader"](http, './assets/i18n/', '.json');
}
const appRoutes = [
    {
        path: '',
        component: _account_account_component__WEBPACK_IMPORTED_MODULE_76__["AccountComponent"] //SignUpSheetComponent
    },
    {
        path: 'volunteer-account',
        component: _account_account_component__WEBPACK_IMPORTED_MODULE_76__["AccountComponent"]
    },
    {
        path: 'volunteer-schedule',
        component: _sign_up_sheet_sign_up_sheet_component__WEBPACK_IMPORTED_MODULE_58__["SignUpSheetComponent"]
    },
    {
        path: 'volunteer-directory',
        component: _volunteer_directory_volunteer_directory_component__WEBPACK_IMPORTED_MODULE_17__["VolunteerDirectoryComponent"]
    },
    {
        path: 'volunteer/:id',
        component: _user_profile_user_profile_component__WEBPACK_IMPORTED_MODULE_75__["UserProfileComponent"]
    },
    {
        path: '**',
        component: _account_account_component__WEBPACK_IMPORTED_MODULE_76__["AccountComponent"] //SignUpSheetComponent
    },
];
let AppModule = class AppModule {
};
AppModule = __decorate([
    Object(_angular_core__WEBPACK_IMPORTED_MODULE_3__["NgModule"])({
        declarations: [
            _app_component__WEBPACK_IMPORTED_MODULE_16__["AppComponent"],
            _new_user_new_user_component__WEBPACK_IMPORTED_MODULE_49__["NewUserComponent"],
            _change_registration_code_change_registration_code_component__WEBPACK_IMPORTED_MODULE_56__["ChangeRegistrationCodeComponent"],
            _mark_important_event_mark_important_event_component__WEBPACK_IMPORTED_MODULE_57__["MarkImportantEventComponent"],
            _sign_up_sheet_sign_up_sheet_component__WEBPACK_IMPORTED_MODULE_58__["SignUpSheetComponent"],
            //HomeComponent,
            _slider_slider_component__WEBPACK_IMPORTED_MODULE_59__["SliderComponent"],
            _sign_up_sheet_add_user_to_event_add_user_to_event_component__WEBPACK_IMPORTED_MODULE_60__["AddUserToEventComponent"],
            _sign_up_sheet_remove_user_from_event_remove_user_from_event_component__WEBPACK_IMPORTED_MODULE_61__["RemoveUserFromEventComponent"],
            _toolbar_toolbar_component__WEBPACK_IMPORTED_MODULE_62__["ToolbarComponent"],
            _sign_up_sheet_mark_permanent_event_mark_permanent_event_component__WEBPACK_IMPORTED_MODULE_63__["MarkPermanentEventComponent"],
            _permanent_volunteer_permanent_volunteer_component__WEBPACK_IMPORTED_MODULE_64__["PermanentVolunteerComponent"],
            _permanent_volunteer_directory_permanent_volunteer_directory_component__WEBPACK_IMPORTED_MODULE_65__["PermanentVolunteerDirectoryComponent"],
            _sign_up_sheet_event_sign_up_table_event_sign_up_table_component__WEBPACK_IMPORTED_MODULE_66__["EventSignUpTableComponent"],
            _bug_report_bug_report_component__WEBPACK_IMPORTED_MODULE_67__["BugReportComponent"],
            _sign_up_sheet_staff_note_staff_note_component__WEBPACK_IMPORTED_MODULE_68__["StaffNoteComponent"],
            _toolbar_notifications_notifications_component__WEBPACK_IMPORTED_MODULE_69__["NotificationsComponent"],
            _sign_up_sheet_event_note_event_note_component__WEBPACK_IMPORTED_MODULE_70__["EventNoteComponent"],
            _volunteer_directory_volunteer_directory_component__WEBPACK_IMPORTED_MODULE_17__["VolunteerDirectoryComponent"],
            _user_event_user_event_component__WEBPACK_IMPORTED_MODULE_71__["UserEventComponent"],
            _sign_up_sheet_new_schedule_new_schedule_component__WEBPACK_IMPORTED_MODULE_73__["NewScheduleComponent"],
            _week_generator_week_generator_component__WEBPACK_IMPORTED_MODULE_74__["WeekGeneratorComponent"],
            _user_profile_user_profile_component__WEBPACK_IMPORTED_MODULE_75__["UserProfileComponent"],
            _account_account_component__WEBPACK_IMPORTED_MODULE_76__["AccountComponent"]
        ],
        imports: [
            _angular_platform_browser__WEBPACK_IMPORTED_MODULE_2__["BrowserModule"],
            _angular_forms__WEBPACK_IMPORTED_MODULE_4__["FormsModule"],
            _angular_material_badge__WEBPACK_IMPORTED_MODULE_50__["MatBadgeModule"],
            _angular_router__WEBPACK_IMPORTED_MODULE_12__["RouterModule"].forRoot(appRoutes),
            _angular_fire__WEBPACK_IMPORTED_MODULE_10__["AngularFireModule"].initializeApp(_environments_environment__WEBPACK_IMPORTED_MODULE_8__["AppConfig"].firebase),
            _angular_fire_auth__WEBPACK_IMPORTED_MODULE_11__["AngularFireAuthModule"],
            _angular_common_http__WEBPACK_IMPORTED_MODULE_5__["HttpClientModule"],
            _core_core_module__WEBPACK_IMPORTED_MODULE_6__["CoreModule"],
            _angular_flex_layout__WEBPACK_IMPORTED_MODULE_54__["FlexLayoutModule"],
            ag_grid_angular__WEBPACK_IMPORTED_MODULE_51__["AgGridModule"].withComponents([]),
            _shared_shared_module__WEBPACK_IMPORTED_MODULE_7__["SharedModule"],
            _fortawesome_angular_fontawesome__WEBPACK_IMPORTED_MODULE_72__["FontAwesomeModule"],
            _detail_detail_module__WEBPACK_IMPORTED_MODULE_15__["DetailModule"],
            _app_routing_module__WEBPACK_IMPORTED_MODULE_9__["AppRoutingModule"],
            _angular_platform_browser_animations__WEBPACK_IMPORTED_MODULE_18__["BrowserAnimationsModule"],
            _angular_material_checkbox__WEBPACK_IMPORTED_MODULE_19__["MatCheckboxModule"],
            _angular_material_checkbox__WEBPACK_IMPORTED_MODULE_19__["MatCheckboxModule"],
            _angular_material_button__WEBPACK_IMPORTED_MODULE_20__["MatButtonModule"],
            _angular_material_input__WEBPACK_IMPORTED_MODULE_21__["MatInputModule"],
            _angular_material_autocomplete__WEBPACK_IMPORTED_MODULE_22__["MatAutocompleteModule"],
            _angular_material_datepicker__WEBPACK_IMPORTED_MODULE_23__["MatDatepickerModule"],
            _angular_material_form_field__WEBPACK_IMPORTED_MODULE_24__["MatFormFieldModule"],
            _angular_material_radio__WEBPACK_IMPORTED_MODULE_25__["MatRadioModule"],
            _angular_material_select__WEBPACK_IMPORTED_MODULE_26__["MatSelectModule"],
            _angular_material_slider__WEBPACK_IMPORTED_MODULE_27__["MatSliderModule"],
            _angular_material_slide_toggle__WEBPACK_IMPORTED_MODULE_28__["MatSlideToggleModule"],
            _angular_material_menu__WEBPACK_IMPORTED_MODULE_29__["MatMenuModule"],
            _angular_material_sidenav__WEBPACK_IMPORTED_MODULE_30__["MatSidenavModule"],
            _angular_material_toolbar__WEBPACK_IMPORTED_MODULE_31__["MatToolbarModule"],
            _angular_material_list__WEBPACK_IMPORTED_MODULE_32__["MatListModule"],
            _angular_material_grid_list__WEBPACK_IMPORTED_MODULE_33__["MatGridListModule"],
            _angular_material_card__WEBPACK_IMPORTED_MODULE_34__["MatCardModule"],
            _angular_material_stepper__WEBPACK_IMPORTED_MODULE_35__["MatStepperModule"],
            _angular_material_tabs__WEBPACK_IMPORTED_MODULE_36__["MatTabsModule"],
            _angular_material_expansion__WEBPACK_IMPORTED_MODULE_37__["MatExpansionModule"],
            _angular_material_button_toggle__WEBPACK_IMPORTED_MODULE_38__["MatButtonToggleModule"],
            _angular_material_chips__WEBPACK_IMPORTED_MODULE_39__["MatChipsModule"],
            _angular_material_icon__WEBPACK_IMPORTED_MODULE_40__["MatIconModule"],
            _angular_material_progress_spinner__WEBPACK_IMPORTED_MODULE_41__["MatProgressSpinnerModule"],
            _angular_material_progress_bar__WEBPACK_IMPORTED_MODULE_42__["MatProgressBarModule"],
            _angular_material_dialog__WEBPACK_IMPORTED_MODULE_43__["MatDialogModule"],
            _angular_material_tooltip__WEBPACK_IMPORTED_MODULE_44__["MatTooltipModule"],
            _angular_material_snack_bar__WEBPACK_IMPORTED_MODULE_45__["MatSnackBarModule"],
            _angular_material_table__WEBPACK_IMPORTED_MODULE_46__["MatTableModule"],
            _angular_material_sort__WEBPACK_IMPORTED_MODULE_47__["MatSortModule"],
            _angular_material_paginator__WEBPACK_IMPORTED_MODULE_48__["MatPaginatorModule"],
            _angular_material_core__WEBPACK_IMPORTED_MODULE_55__["MatNativeDateModule"],
            angular_bootstrap_md__WEBPACK_IMPORTED_MODULE_52__["MDBBootstrapModule"].forRoot(),
            _ng_bootstrap_ng_bootstrap__WEBPACK_IMPORTED_MODULE_53__["NgbModule"],
            _angular_forms__WEBPACK_IMPORTED_MODULE_4__["ReactiveFormsModule"],
            _ngx_translate_core__WEBPACK_IMPORTED_MODULE_13__["TranslateModule"].forRoot({
                loader: {
                    provide: _ngx_translate_core__WEBPACK_IMPORTED_MODULE_13__["TranslateLoader"],
                    useFactory: HttpLoaderFactory,
                    deps: [_angular_common_http__WEBPACK_IMPORTED_MODULE_5__["HttpClient"]]
                }
            })
        ],
        providers: [],
        bootstrap: [_app_component__WEBPACK_IMPORTED_MODULE_16__["AppComponent"]]
    })
], AppModule);



/***/ }),

/***/ "./src/app/bug-report/bug-report.component.scss":
/*!******************************************************!*\
  !*** ./src/app/bug-report/bug-report.component.scss ***!
  \******************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony default export */ __webpack_exports__["default"] = ("::ng-deep .bug-report .modal-dialog {\n  max-width: 60% !important;\n  width: 60% !important;\n}\n\n.modal-header {\n  background-color: #5fce99;\n}\n\n.modal-title {\n  color: white;\n}\n\n.modal-body {\n  padding: 2.5rem 3rem 0rem 3rem;\n}\n\n.footer {\n  padding-bottom: 2.5rem;\n  text-align: center;\n}\n\n.form-row {\n  justify-content: center;\n}\n\n.btn-submit {\n  background-color: #5fce99 !important;\n  color: white !important;\n  border-color: #5fce99 !important;\n}\n\n.btn-submit:hover {\n  background-color: #40c485 !important;\n  border-color: #40c485 !important;\n}\n\n.form {\n  padding-bottom: 0;\n}\n\n.desc {\n  width: 100%;\n}\n\n.btn-cancel {\n  color: #5fce99 !important;\n  border-color: #5fce99 !important;\n  margin-right: 1rem;\n}\n\n.btn-cancel:hover {\n  background-color: #5fce99 !important;\n  color: white !important;\n}\n\n.form-section {\n  margin-bottom: 1.5rem;\n  color: darkgrey;\n  margin-top: 1.5rem;\n}\n\n.div-desc {\n  justify-content: center;\n}\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi9Vc2Vycy9iZW5qYW1pbmVtaWxpYW5pL1NhbnRyb3BvbHJvdWxhbnQvYW5ndWxhci1lbGVjdHJvbi9zcmMvYXBwL2J1Zy1yZXBvcnQvYnVnLXJlcG9ydC5jb21wb25lbnQuc2NzcyIsInNyYy9hcHAvYnVnLXJlcG9ydC9idWctcmVwb3J0LmNvbXBvbmVudC5zY3NzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUNBO0VBQ0sseUJBQUE7RUFDQSxxQkFBQTtBQ0FMOztBREdBO0VBQ0UseUJBQUE7QUNBRjs7QURHQTtFQUNFLFlBQUE7QUNBRjs7QURHQTtFQUNFLDhCQUFBO0FDQUY7O0FER0E7RUFDRSxzQkFBQTtFQUNBLGtCQUFBO0FDQUY7O0FERUE7RUFDRSx1QkFBQTtBQ0NGOztBRENBO0VBQ0Usb0NBQUE7RUFDQSx1QkFBQTtFQUNBLGdDQUFBO0FDRUY7O0FEQ0E7RUFDRSxvQ0FBQTtFQUNBLGdDQUFBO0FDRUY7O0FEQ0E7RUFDRSxpQkFBQTtBQ0VGOztBRENBO0VBQ0UsV0FBQTtBQ0VGOztBRENBO0VBQ0UseUJBQUE7RUFDQSxnQ0FBQTtFQUNBLGtCQUFBO0FDRUY7O0FEQ0E7RUFDRSxvQ0FBQTtFQUNBLHVCQUFBO0FDRUY7O0FEQ0E7RUFDRSxxQkFBQTtFQUNBLGVBQUE7RUFDQSxrQkFBQTtBQ0VGOztBRENBO0VBQ0UsdUJBQUE7QUNFRiIsImZpbGUiOiJzcmMvYXBwL2J1Zy1yZXBvcnQvYnVnLXJlcG9ydC5jb21wb25lbnQuc2NzcyIsInNvdXJjZXNDb250ZW50IjpbIlxuOjpuZy1kZWVwIC5idWctcmVwb3J0IC5tb2RhbC1kaWFsb2cge1xuICAgICBtYXgtd2lkdGg6IDYwJSAhaW1wb3J0YW50O1xuICAgICB3aWR0aDogNjAlICFpbXBvcnRhbnQ7XG59XG5cbi5tb2RhbC1oZWFkZXJ7XG4gIGJhY2tncm91bmQtY29sb3I6ICM1ZmNlOTk7XG59XG5cbi5tb2RhbC10aXRsZXtcbiAgY29sb3I6IHdoaXRlO1xufVxuXG4ubW9kYWwtYm9keSB7XG4gIHBhZGRpbmc6IDIuNXJlbSAzcmVtIDByZW0gM3JlbVxufVxuXG4uZm9vdGVyIHtcbiAgcGFkZGluZy1ib3R0b206IDIuNXJlbTtcbiAgdGV4dC1hbGlnbjogY2VudGVyO1xufVxuLmZvcm0tcm93e1xuICBqdXN0aWZ5LWNvbnRlbnQ6IGNlbnRlcjtcbn1cbi5idG4tc3VibWl0IHtcbiAgYmFja2dyb3VuZC1jb2xvcjogIzVmY2U5OSAhaW1wb3J0YW50O1xuICBjb2xvcjogd2hpdGUgIWltcG9ydGFudDtcbiAgYm9yZGVyLWNvbG9yOiAjNWZjZTk5ICFpbXBvcnRhbnQ7XG59XG5cbi5idG4tc3VibWl0OmhvdmVyIHtcbiAgYmFja2dyb3VuZC1jb2xvcjogIzQwYzQ4NSAhaW1wb3J0YW50O1xuICBib3JkZXItY29sb3I6ICM0MGM0ODUgIWltcG9ydGFudDtcbn1cblxuLmZvcm17XG4gIHBhZGRpbmctYm90dG9tOiAwO1xufVxuXG4uZGVzYyB7XG4gIHdpZHRoOiAxMDAlO1xufVxuXG4uYnRuLWNhbmNlbCB7XG4gIGNvbG9yOiM1ZmNlOTkgIWltcG9ydGFudDtcbiAgYm9yZGVyLWNvbG9yOiM1ZmNlOTkgIWltcG9ydGFudDtcbiAgbWFyZ2luLXJpZ2h0OjFyZW07XG59XG5cbi5idG4tY2FuY2VsOmhvdmVyIHtcbiAgYmFja2dyb3VuZC1jb2xvcjogIzVmY2U5OSAhaW1wb3J0YW50O1xuICBjb2xvcjogd2hpdGUgIWltcG9ydGFudDtcbn1cblxuLmZvcm0tc2VjdGlvbntcbiAgbWFyZ2luLWJvdHRvbTogMS41cmVtO1xuICBjb2xvcjogZGFya2dyZXk7XG4gIG1hcmdpbi10b3A6IDEuNXJlbTtcbn1cblxuLmRpdi1kZXNjIHtcbiAganVzdGlmeS1jb250ZW50OiBjZW50ZXI7XG59XG4iLCI6Om5nLWRlZXAgLmJ1Zy1yZXBvcnQgLm1vZGFsLWRpYWxvZyB7XG4gIG1heC13aWR0aDogNjAlICFpbXBvcnRhbnQ7XG4gIHdpZHRoOiA2MCUgIWltcG9ydGFudDtcbn1cblxuLm1vZGFsLWhlYWRlciB7XG4gIGJhY2tncm91bmQtY29sb3I6ICM1ZmNlOTk7XG59XG5cbi5tb2RhbC10aXRsZSB7XG4gIGNvbG9yOiB3aGl0ZTtcbn1cblxuLm1vZGFsLWJvZHkge1xuICBwYWRkaW5nOiAyLjVyZW0gM3JlbSAwcmVtIDNyZW07XG59XG5cbi5mb290ZXIge1xuICBwYWRkaW5nLWJvdHRvbTogMi41cmVtO1xuICB0ZXh0LWFsaWduOiBjZW50ZXI7XG59XG5cbi5mb3JtLXJvdyB7XG4gIGp1c3RpZnktY29udGVudDogY2VudGVyO1xufVxuXG4uYnRuLXN1Ym1pdCB7XG4gIGJhY2tncm91bmQtY29sb3I6ICM1ZmNlOTkgIWltcG9ydGFudDtcbiAgY29sb3I6IHdoaXRlICFpbXBvcnRhbnQ7XG4gIGJvcmRlci1jb2xvcjogIzVmY2U5OSAhaW1wb3J0YW50O1xufVxuXG4uYnRuLXN1Ym1pdDpob3ZlciB7XG4gIGJhY2tncm91bmQtY29sb3I6ICM0MGM0ODUgIWltcG9ydGFudDtcbiAgYm9yZGVyLWNvbG9yOiAjNDBjNDg1ICFpbXBvcnRhbnQ7XG59XG5cbi5mb3JtIHtcbiAgcGFkZGluZy1ib3R0b206IDA7XG59XG5cbi5kZXNjIHtcbiAgd2lkdGg6IDEwMCU7XG59XG5cbi5idG4tY2FuY2VsIHtcbiAgY29sb3I6ICM1ZmNlOTkgIWltcG9ydGFudDtcbiAgYm9yZGVyLWNvbG9yOiAjNWZjZTk5ICFpbXBvcnRhbnQ7XG4gIG1hcmdpbi1yaWdodDogMXJlbTtcbn1cblxuLmJ0bi1jYW5jZWw6aG92ZXIge1xuICBiYWNrZ3JvdW5kLWNvbG9yOiAjNWZjZTk5ICFpbXBvcnRhbnQ7XG4gIGNvbG9yOiB3aGl0ZSAhaW1wb3J0YW50O1xufVxuXG4uZm9ybS1zZWN0aW9uIHtcbiAgbWFyZ2luLWJvdHRvbTogMS41cmVtO1xuICBjb2xvcjogZGFya2dyZXk7XG4gIG1hcmdpbi10b3A6IDEuNXJlbTtcbn1cblxuLmRpdi1kZXNjIHtcbiAganVzdGlmeS1jb250ZW50OiBjZW50ZXI7XG59Il19 */");

/***/ }),

/***/ "./src/app/bug-report/bug-report.component.ts":
/*!****************************************************!*\
  !*** ./src/app/bug-report/bug-report.component.ts ***!
  \****************************************************/
/*! exports provided: BugReportComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "BugReportComponent", function() { return BugReportComponent; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/__ivy_ngcc__/fesm2015/core.js");
/* harmony import */ var _ng_bootstrap_ng_bootstrap__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @ng-bootstrap/ng-bootstrap */ "./node_modules/@ng-bootstrap/ng-bootstrap/__ivy_ngcc__/fesm2015/ng-bootstrap.js");
/* harmony import */ var _firebase_service_service__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../firebase-service.service */ "./src/app/firebase-service.service.ts");
/* harmony import */ var _angular_fire_database__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @angular/fire/database */ "./node_modules/@angular/fire/__ivy_ngcc__/fesm2015/angular-fire-database.js");
/* harmony import */ var _angular_forms__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @angular/forms */ "./node_modules/@angular/forms/__ivy_ngcc__/fesm2015/forms.js");
/* harmony import */ var _angular_material_snack_bar__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! @angular/material/snack-bar */ "./node_modules/@angular/material/__ivy_ngcc__/fesm2015/snack-bar.js");
var __decorate = (undefined && undefined.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (undefined && undefined.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __importDefault = (undefined && undefined.__importDefault) || function (mod) {
  return (mod && mod.__esModule) ? mod : { "default": mod };
};






let BugReportComponent = class BugReportComponent {
    constructor(modalService, db, formBuilder, firebase, snackBar) {
        this.modalService = modalService;
        this.db = db;
        this.formBuilder = formBuilder;
        this.firebase = firebase;
        this.snackBar = snackBar;
        this.model = {};
    }
    ngOnInit() {
        this.myForm = this.formBuilder.group({
            description: ['', _angular_forms__WEBPACK_IMPORTED_MODULE_4__["Validators"].required]
        });
    }
    open(content) {
        this.modalReference = this.modalService.open(content, { ariaLabelledBy: 'modal-basic-title', size: 'sm', windowClass: 'bug-report', });
    }
    onSubmit(f) {
        this.myForm.markAllAsTouched();
        if (this.myForm.valid) {
            this.modalReference.close();
            console.log(this.model.description);
            this.firebase.addNewBug(this.model.description);
            this.model = {};
            this.myForm.reset();
            this.openSnackbar();
        }
    }
    openSnackbar() {
        const config = new _angular_material_snack_bar__WEBPACK_IMPORTED_MODULE_5__["MatSnackBarConfig"]();
        config.verticalPosition = 'bottom';
        config.horizontalPosition = 'center';
        config.duration = 2000;
        this.snackBar.open('The bug report has been submitted.', '', config);
    }
};
BugReportComponent.ctorParameters = () => [
    { type: _ng_bootstrap_ng_bootstrap__WEBPACK_IMPORTED_MODULE_1__["NgbModal"] },
    { type: _angular_fire_database__WEBPACK_IMPORTED_MODULE_3__["AngularFireDatabase"] },
    { type: _angular_forms__WEBPACK_IMPORTED_MODULE_4__["FormBuilder"] },
    { type: _firebase_service_service__WEBPACK_IMPORTED_MODULE_2__["FirebaseService"] },
    { type: _angular_material_snack_bar__WEBPACK_IMPORTED_MODULE_5__["MatSnackBar"] }
];
BugReportComponent = __decorate([
    Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["Component"])({
        selector: 'app-bug-report',
        template: __importDefault(__webpack_require__(/*! raw-loader!./bug-report.component.html */ "./node_modules/raw-loader/dist/cjs.js!./src/app/bug-report/bug-report.component.html")).default,
        encapsulation: _angular_core__WEBPACK_IMPORTED_MODULE_0__["ViewEncapsulation"].None,
        styles: [__importDefault(__webpack_require__(/*! ./bug-report.component.scss */ "./src/app/bug-report/bug-report.component.scss")).default]
    }),
    __metadata("design:paramtypes", [_ng_bootstrap_ng_bootstrap__WEBPACK_IMPORTED_MODULE_1__["NgbModal"],
        _angular_fire_database__WEBPACK_IMPORTED_MODULE_3__["AngularFireDatabase"],
        _angular_forms__WEBPACK_IMPORTED_MODULE_4__["FormBuilder"],
        _firebase_service_service__WEBPACK_IMPORTED_MODULE_2__["FirebaseService"],
        _angular_material_snack_bar__WEBPACK_IMPORTED_MODULE_5__["MatSnackBar"]])
], BugReportComponent);



/***/ }),

/***/ "./src/app/change-registration-code/change-registration-code.component.scss":
/*!**********************************************************************************!*\
  !*** ./src/app/change-registration-code/change-registration-code.component.scss ***!
  \**********************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony default export */ __webpack_exports__["default"] = ("::ng-deep .change-registration-code .modal-dialog {\n  max-width: 40% !important;\n  width: 40% !important;\n}\n\n.form {\n  padding-bottom: 0;\n}\n\n.modal-header {\n  background-color: #5fce99;\n}\n\n.modal-title {\n  color: white;\n}\n\n.modal-body {\n  padding: 1rem 2rem 0 2rem;\n}\n\n.footer {\n  padding-bottom: 2.5rem;\n  text-align: center;\n}\n\n.btn-change-registration-code {\n  color: #5fce99 !important;\n  border-color: #5fce99 !important;\n}\n\n.btn-change-registration-code:hover {\n  background-color: #5fce99 !important;\n  color: white !important;\n}\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi9Vc2Vycy9iZW5qYW1pbmVtaWxpYW5pL1NhbnRyb3BvbHJvdWxhbnQvYW5ndWxhci1lbGVjdHJvbi9zcmMvYXBwL2NoYW5nZS1yZWdpc3RyYXRpb24tY29kZS9jaGFuZ2UtcmVnaXN0cmF0aW9uLWNvZGUuY29tcG9uZW50LnNjc3MiLCJzcmMvYXBwL2NoYW5nZS1yZWdpc3RyYXRpb24tY29kZS9jaGFuZ2UtcmVnaXN0cmF0aW9uLWNvZGUuY29tcG9uZW50LnNjc3MiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUE7RUFDSyx5QkFBQTtFQUNBLHFCQUFBO0FDQ0w7O0FERUE7RUFDRSxpQkFBQTtBQ0NGOztBREVBO0VBQ0UseUJBQUE7QUNDRjs7QURFQTtFQUNFLFlBQUE7QUNDRjs7QURFQTtFQUNFLHlCQUFBO0FDQ0Y7O0FERUE7RUFDRSxzQkFBQTtFQUNBLGtCQUFBO0FDQ0Y7O0FERUE7RUFDRSx5QkFBQTtFQUNBLGdDQUFBO0FDQ0Y7O0FERUE7RUFDRSxvQ0FBQTtFQUNBLHVCQUFBO0FDQ0YiLCJmaWxlIjoic3JjL2FwcC9jaGFuZ2UtcmVnaXN0cmF0aW9uLWNvZGUvY2hhbmdlLXJlZ2lzdHJhdGlvbi1jb2RlLmNvbXBvbmVudC5zY3NzIiwic291cmNlc0NvbnRlbnQiOlsiOjpuZy1kZWVwIC5jaGFuZ2UtcmVnaXN0cmF0aW9uLWNvZGUgLm1vZGFsLWRpYWxvZyB7XG4gICAgIG1heC13aWR0aDogNDAlICFpbXBvcnRhbnQ7XG4gICAgIHdpZHRoOiA0MCUgIWltcG9ydGFudDtcbn1cblxuLmZvcm17XG4gIHBhZGRpbmctYm90dG9tOiAwO1xufVxuXG4ubW9kYWwtaGVhZGVye1xuICBiYWNrZ3JvdW5kLWNvbG9yOiAjNWZjZTk5O1xufVxuXG4ubW9kYWwtdGl0bGV7XG4gIGNvbG9yOiB3aGl0ZTtcbn1cblxuLm1vZGFsLWJvZHl7XG4gIHBhZGRpbmc6IDFyZW0gMnJlbSAwIDJyZW07XG59XG5cbi5mb290ZXIge1xuICBwYWRkaW5nLWJvdHRvbTogMi41cmVtO1xuICB0ZXh0LWFsaWduOiBjZW50ZXI7XG59XG5cbi5idG4tY2hhbmdlLXJlZ2lzdHJhdGlvbi1jb2RlIHtcbiAgY29sb3I6IzVmY2U5OSAhaW1wb3J0YW50O1xuICBib3JkZXItY29sb3I6IzVmY2U5OSAhaW1wb3J0YW50O1xufVxuXG4uYnRuLWNoYW5nZS1yZWdpc3RyYXRpb24tY29kZTpob3ZlciB7XG4gIGJhY2tncm91bmQtY29sb3I6ICM1ZmNlOTkgIWltcG9ydGFudDtcbiAgY29sb3I6IHdoaXRlICFpbXBvcnRhbnQ7XG59XG4iLCI6Om5nLWRlZXAgLmNoYW5nZS1yZWdpc3RyYXRpb24tY29kZSAubW9kYWwtZGlhbG9nIHtcbiAgbWF4LXdpZHRoOiA0MCUgIWltcG9ydGFudDtcbiAgd2lkdGg6IDQwJSAhaW1wb3J0YW50O1xufVxuXG4uZm9ybSB7XG4gIHBhZGRpbmctYm90dG9tOiAwO1xufVxuXG4ubW9kYWwtaGVhZGVyIHtcbiAgYmFja2dyb3VuZC1jb2xvcjogIzVmY2U5OTtcbn1cblxuLm1vZGFsLXRpdGxlIHtcbiAgY29sb3I6IHdoaXRlO1xufVxuXG4ubW9kYWwtYm9keSB7XG4gIHBhZGRpbmc6IDFyZW0gMnJlbSAwIDJyZW07XG59XG5cbi5mb290ZXIge1xuICBwYWRkaW5nLWJvdHRvbTogMi41cmVtO1xuICB0ZXh0LWFsaWduOiBjZW50ZXI7XG59XG5cbi5idG4tY2hhbmdlLXJlZ2lzdHJhdGlvbi1jb2RlIHtcbiAgY29sb3I6ICM1ZmNlOTkgIWltcG9ydGFudDtcbiAgYm9yZGVyLWNvbG9yOiAjNWZjZTk5ICFpbXBvcnRhbnQ7XG59XG5cbi5idG4tY2hhbmdlLXJlZ2lzdHJhdGlvbi1jb2RlOmhvdmVyIHtcbiAgYmFja2dyb3VuZC1jb2xvcjogIzVmY2U5OSAhaW1wb3J0YW50O1xuICBjb2xvcjogd2hpdGUgIWltcG9ydGFudDtcbn0iXX0= */");

/***/ }),

/***/ "./src/app/change-registration-code/change-registration-code.component.ts":
/*!********************************************************************************!*\
  !*** ./src/app/change-registration-code/change-registration-code.component.ts ***!
  \********************************************************************************/
/*! exports provided: ChangeRegistrationCodeComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "ChangeRegistrationCodeComponent", function() { return ChangeRegistrationCodeComponent; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/__ivy_ngcc__/fesm2015/core.js");
/* harmony import */ var _ng_bootstrap_ng_bootstrap__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @ng-bootstrap/ng-bootstrap */ "./node_modules/@ng-bootstrap/ng-bootstrap/__ivy_ngcc__/fesm2015/ng-bootstrap.js");
/* harmony import */ var _angular_fire_database__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/fire/database */ "./node_modules/@angular/fire/__ivy_ngcc__/fesm2015/angular-fire-database.js");
/* harmony import */ var _angular_forms__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @angular/forms */ "./node_modules/@angular/forms/__ivy_ngcc__/fesm2015/forms.js");
var __decorate = (undefined && undefined.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (undefined && undefined.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __importDefault = (undefined && undefined.__importDefault) || function (mod) {
  return (mod && mod.__esModule) ? mod : { "default": mod };
};




let ChangeRegistrationCodeComponent = class ChangeRegistrationCodeComponent {
    constructor(modalService, db, formBuilder) {
        this.modalService = modalService;
        this.db = db;
        this.formBuilder = formBuilder;
        this.model = {};
        this.result = db.object('/registration_code').valueChanges();
    }
    ngOnInit() {
        this.myForm = this.formBuilder.group({
            new_registration_code: ['', _angular_forms__WEBPACK_IMPORTED_MODULE_3__["Validators"].required]
        });
    }
    open(content) {
        this.modalReference = this.modalService.open(content, { ariaLabelledBy: 'modal-basic-title',
            size: 'sm',
            windowClass: 'change-registration-code',
            centered: true });
    }
    updateRegistrationCode() {
        this.db.object('/')
            .update({
            registration_code: this.registration_code
        });
    }
    onSubmit() {
        this.myForm.markAllAsTouched();
        if (this.myForm.valid) {
            this.registration_code = this.model.registration_code;
            this.updateRegistrationCode();
            this.modalReference.close();
            this.myForm.reset();
            this.model = {};
        }
    }
};
ChangeRegistrationCodeComponent.ctorParameters = () => [
    { type: _ng_bootstrap_ng_bootstrap__WEBPACK_IMPORTED_MODULE_1__["NgbModal"] },
    { type: _angular_fire_database__WEBPACK_IMPORTED_MODULE_2__["AngularFireDatabase"] },
    { type: _angular_forms__WEBPACK_IMPORTED_MODULE_3__["FormBuilder"] }
];
ChangeRegistrationCodeComponent = __decorate([
    Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["Component"])({
        selector: 'app-change-registration-code',
        template: __importDefault(__webpack_require__(/*! raw-loader!./change-registration-code.component.html */ "./node_modules/raw-loader/dist/cjs.js!./src/app/change-registration-code/change-registration-code.component.html")).default,
        styles: [__importDefault(__webpack_require__(/*! ./change-registration-code.component.scss */ "./src/app/change-registration-code/change-registration-code.component.scss")).default]
    }),
    __metadata("design:paramtypes", [_ng_bootstrap_ng_bootstrap__WEBPACK_IMPORTED_MODULE_1__["NgbModal"], _angular_fire_database__WEBPACK_IMPORTED_MODULE_2__["AngularFireDatabase"], _angular_forms__WEBPACK_IMPORTED_MODULE_3__["FormBuilder"]])
], ChangeRegistrationCodeComponent);



/***/ }),

/***/ "./src/app/core/core.module.ts":
/*!*************************************!*\
  !*** ./src/app/core/core.module.ts ***!
  \*************************************/
/*! exports provided: CoreModule */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "CoreModule", function() { return CoreModule; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/__ivy_ngcc__/fesm2015/core.js");
/* harmony import */ var _angular_common__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/common */ "./node_modules/@angular/common/__ivy_ngcc__/fesm2015/common.js");
var __decorate = (undefined && undefined.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __importDefault = (undefined && undefined.__importDefault) || function (mod) {
  return (mod && mod.__esModule) ? mod : { "default": mod };
};


let CoreModule = class CoreModule {
};
CoreModule = __decorate([
    Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["NgModule"])({
        declarations: [],
        imports: [
            _angular_common__WEBPACK_IMPORTED_MODULE_1__["CommonModule"]
        ]
    })
], CoreModule);



/***/ }),

/***/ "./src/app/core/services/electron/electron.service.ts":
/*!************************************************************!*\
  !*** ./src/app/core/services/electron/electron.service.ts ***!
  \************************************************************/
/*! exports provided: ElectronService */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "ElectronService", function() { return ElectronService; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/__ivy_ngcc__/fesm2015/core.js");
var __decorate = (undefined && undefined.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (undefined && undefined.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __importDefault = (undefined && undefined.__importDefault) || function (mod) {
  return (mod && mod.__esModule) ? mod : { "default": mod };
};

let ElectronService = class ElectronService {
    constructor() {
        // Conditional imports
        if (this.isElectron) {
            this.ipcRenderer = window.require('electron').ipcRenderer;
            this.webFrame = window.require('electron').webFrame;
            this.remote = window.require('electron').remote;
            this.childProcess = window.require('child_process');
            this.fs = window.require('fs');
        }
    }
    get isElectron() {
        return !!(window && window.process && window.process.type);
    }
};
ElectronService = __decorate([
    Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["Injectable"])({
        providedIn: 'root'
    }),
    __metadata("design:paramtypes", [])
], ElectronService);



/***/ }),

/***/ "./src/app/core/services/index.ts":
/*!****************************************!*\
  !*** ./src/app/core/services/index.ts ***!
  \****************************************/
/*! exports provided: ElectronService */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _electron_electron_service__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./electron/electron.service */ "./src/app/core/services/electron/electron.service.ts");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "ElectronService", function() { return _electron_electron_service__WEBPACK_IMPORTED_MODULE_0__["ElectronService"]; });

var __importDefault = (undefined && undefined.__importDefault) || function (mod) {
  return (mod && mod.__esModule) ? mod : { "default": mod };
};



/***/ }),

/***/ "./src/app/core/services/modalService.ts":
/*!***********************************************!*\
  !*** ./src/app/core/services/modalService.ts ***!
  \***********************************************/
/*! exports provided: ModalService */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "ModalService", function() { return ModalService; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/__ivy_ngcc__/fesm2015/core.js");
var __decorate = (undefined && undefined.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __importDefault = (undefined && undefined.__importDefault) || function (mod) {
  return (mod && mod.__esModule) ? mod : { "default": mod };
};

let ModalService = class ModalService {
    set(modal) {
        this.modal = modal;
    }
    open(event_id, eventType, date, volunteerList) {
        console.log(this.modal);
        this.modal.open(event_id, eventType, date, volunteerList);
    }
};
ModalService = __decorate([
    Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["Injectable"])({
        providedIn: 'root'
    })
], ModalService);



/***/ }),

/***/ "./src/app/detail/detail-routing.module.ts":
/*!*************************************************!*\
  !*** ./src/app/detail/detail-routing.module.ts ***!
  \*************************************************/
/*! exports provided: DetailRoutingModule */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "DetailRoutingModule", function() { return DetailRoutingModule; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/__ivy_ngcc__/fesm2015/core.js");
/* harmony import */ var _angular_common__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/common */ "./node_modules/@angular/common/__ivy_ngcc__/fesm2015/common.js");
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/router */ "./node_modules/@angular/router/__ivy_ngcc__/fesm2015/router.js");
/* harmony import */ var _detail_component__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./detail.component */ "./src/app/detail/detail.component.ts");
var __decorate = (undefined && undefined.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __importDefault = (undefined && undefined.__importDefault) || function (mod) {
  return (mod && mod.__esModule) ? mod : { "default": mod };
};




const routes = [
    {
        path: 'detail',
        component: _detail_component__WEBPACK_IMPORTED_MODULE_3__["DetailComponent"]
    }
];
let DetailRoutingModule = class DetailRoutingModule {
};
DetailRoutingModule = __decorate([
    Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["NgModule"])({
        declarations: [],
        imports: [_angular_common__WEBPACK_IMPORTED_MODULE_1__["CommonModule"], _angular_router__WEBPACK_IMPORTED_MODULE_2__["RouterModule"].forChild(routes)],
        exports: [_angular_router__WEBPACK_IMPORTED_MODULE_2__["RouterModule"]]
    })
], DetailRoutingModule);



/***/ }),

/***/ "./src/app/detail/detail.component.scss":
/*!**********************************************!*\
  !*** ./src/app/detail/detail.component.scss ***!
  \**********************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony default export */ __webpack_exports__["default"] = ("\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IiIsImZpbGUiOiJzcmMvYXBwL2RldGFpbC9kZXRhaWwuY29tcG9uZW50LnNjc3MifQ== */");

/***/ }),

/***/ "./src/app/detail/detail.component.ts":
/*!********************************************!*\
  !*** ./src/app/detail/detail.component.ts ***!
  \********************************************/
/*! exports provided: DetailComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "DetailComponent", function() { return DetailComponent; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/__ivy_ngcc__/fesm2015/core.js");
var __decorate = (undefined && undefined.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (undefined && undefined.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __importDefault = (undefined && undefined.__importDefault) || function (mod) {
  return (mod && mod.__esModule) ? mod : { "default": mod };
};

let DetailComponent = class DetailComponent {
    constructor() { }
    ngOnInit() { }
};
DetailComponent = __decorate([
    Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["Component"])({
        selector: 'app-detail',
        template: __importDefault(__webpack_require__(/*! raw-loader!./detail.component.html */ "./node_modules/raw-loader/dist/cjs.js!./src/app/detail/detail.component.html")).default,
        styles: [__importDefault(__webpack_require__(/*! ./detail.component.scss */ "./src/app/detail/detail.component.scss")).default]
    }),
    __metadata("design:paramtypes", [])
], DetailComponent);



/***/ }),

/***/ "./src/app/detail/detail.module.ts":
/*!*****************************************!*\
  !*** ./src/app/detail/detail.module.ts ***!
  \*****************************************/
/*! exports provided: DetailModule */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "DetailModule", function() { return DetailModule; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/__ivy_ngcc__/fesm2015/core.js");
/* harmony import */ var _angular_common__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/common */ "./node_modules/@angular/common/__ivy_ngcc__/fesm2015/common.js");
/* harmony import */ var _detail_routing_module__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./detail-routing.module */ "./src/app/detail/detail-routing.module.ts");
/* harmony import */ var _detail_component__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./detail.component */ "./src/app/detail/detail.component.ts");
/* harmony import */ var _shared_shared_module__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../shared/shared.module */ "./src/app/shared/shared.module.ts");
var __decorate = (undefined && undefined.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __importDefault = (undefined && undefined.__importDefault) || function (mod) {
  return (mod && mod.__esModule) ? mod : { "default": mod };
};





let DetailModule = class DetailModule {
};
DetailModule = __decorate([
    Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["NgModule"])({
        declarations: [_detail_component__WEBPACK_IMPORTED_MODULE_3__["DetailComponent"]],
        imports: [_angular_common__WEBPACK_IMPORTED_MODULE_1__["CommonModule"], _shared_shared_module__WEBPACK_IMPORTED_MODULE_4__["SharedModule"], _detail_routing_module__WEBPACK_IMPORTED_MODULE_2__["DetailRoutingModule"]]
    })
], DetailModule);



/***/ }),

/***/ "./src/app/firebase-service.service.ts":
/*!*********************************************!*\
  !*** ./src/app/firebase-service.service.ts ***!
  \*********************************************/
/*! exports provided: FirebaseService */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "FirebaseService", function() { return FirebaseService; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/__ivy_ngcc__/fesm2015/core.js");
/* harmony import */ var _angular_fire_database__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/fire/database */ "./node_modules/@angular/fire/__ivy_ngcc__/fesm2015/angular-fire-database.js");
/* harmony import */ var rxjs_operators__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! rxjs/operators */ "./node_modules/rxjs/_esm2015/operators/index.js");
var __decorate = (undefined && undefined.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (undefined && undefined.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __awaiter = (undefined && undefined.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (undefined && undefined.__importDefault) || function (mod) {
  return (mod && mod.__esModule) ? mod : { "default": mod };
};



let FirebaseService = class FirebaseService {
    constructor(db) {
        this.db = db;
        this.eventDates = {};
        this.eventTypesCool = {
            "kitam": 5,
            "kitpm": 5,
            "deldr": 4,
            "deliv": 10
            // "Kitcham AM Sat": "kitas",
            // "Kitchem PM Sat": "kitps",
            // "Delivery Driver Sat": "delds",
            // "Delivery Sat": "delis",
        };
    }
    getUserSamples() {
        this.volunteerSampleRef = this.db.list("userSample");
        this.volunteerSamples = this.volunteerSampleRef
            .snapshotChanges()
            .pipe(Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_2__["map"])((changes) => changes.map((c) => (Object.assign({ id: c.payload.key }, c.payload.val())))));
        return this.volunteerSamples;
    }
    getUsers() {
        this.volunteerRef = this.db.list("user");
        this.volunteers = this.volunteerRef
            .snapshotChanges()
            .pipe(Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_2__["map"])((changes) => changes.map((c) => (Object.assign({ id: c.payload.key }, c.payload.val())))));
        return this.volunteers;
    }
    getUser(userId) {
        return this.db.object("user/" + userId).valueChanges();
    }
    getPermanentEvents() {
        this.permanentEventsRef = this.db.list("permanent_events");
        this.permanentEvents = this.permanentEventsRef
            .snapshotChanges()
            .pipe(Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_2__["map"])((changes) => changes.map((c) => (Object.assign({ id: c.payload.key }, c.payload.val())))));
        return this.permanentEvents;
    }
    getEvents() {
        this.eventRef = this.db.list("event");
        this.events = this.eventRef
            .snapshotChanges()
            .pipe(Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_2__["map"])((changes) => changes.map((c) => (Object.assign({ id: c.payload.key }, c.payload.val())))));
        return this.events;
    }
    getPastEvents() {
        this.pastEventRef = this.db.list("past_events");
        this.pastEvents = this.pastEventRef
            .snapshotChanges()
            .pipe(Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_2__["map"])((changes) => changes.map((c) => (Object.assign({ id: c.payload.key }, c.payload.val())))));
        return this.pastEvents;
    }
    getEventsJson() {
        this.events = this.getEvents();
        this.events.subscribe((snapshots) => {
            snapshots.forEach((snapshot) => {
                let event_date = snapshot.event_date.toString();
                const event_type = snapshot.event_type.toString();
                event_date = this.formatDate(event_date);
                if (!(event_date in this.eventDates)) {
                    this.eventDates[event_date] = {};
                    this.eventDates[event_date][event_type] = [snapshot.id];
                }
                else {
                    if (!(event_type in this.eventDates[event_date])) {
                        this.eventDates[event_date][event_type] = [snapshot.id];
                    }
                    else {
                        this.eventDates[event_date][event_type].push(snapshot.id);
                    }
                }
            });
        });
        return this.eventDates;
    }
    formatDate(date) {
        const year = "20" + date.substring(0, 2);
        const month = date.substring(2, 4);
        const day = date.substring(4, 6);
        date = month + "/" + day + "/" + year;
        return date;
    }
    changeEventImportance(event_id, is_important_event) {
        this.db.object("/event/" + event_id).update({
            is_important_event: is_important_event,
        });
    }
    removeUserFromEvent(event_id) {
        this.updateCancellations(event_id);
        this.db.object("/event/" + event_id).update({
            first_name: "",
            last_name: "",
            uid: "nan",
            staff_note: "",
        });
    }
    updateCancellations(event_id) {
        var userId;
        var count;
        this.eventRef = this.db.list("event");
        this.events = this.eventRef
            .snapshotChanges()
            .pipe(Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_2__["map"])((changes) => changes.map((c) => (Object.assign({ id: c.payload.key }, c.payload.val())))));
        this.events.subscribe((snapshots) => {
            snapshots.forEach((snapshot) => {
                if (snapshot.id == event_id) {
                    //console.log(snapshot);
                    userId = snapshot.uid;
                }
            });
        });
        this.volunteerRef = this.db.list("user");
        this.volunteers = this.volunteerRef
            .snapshotChanges()
            .pipe(Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_2__["map"])((changes) => changes.map((c) => (Object.assign({ id: c.payload.key }, c.payload.val())))));
        this.volunteers.subscribe((snapshots) => {
            snapshots.forEach((snapshot) => {
                if (snapshot.id == userId) {
                    count = snapshot.cancellations;
                    if (isNaN(count)) {
                        count = 0;
                    }
                    count++;
                    this.db.object("/user/" + userId).update({
                        cancellations: count,
                    });
                }
            });
        });
    }
    addCancellation(eventId, uid, reason) {
        if (reason == "" || reason == null) {
            this.db.object("cancellation/" + eventId + "_" + uid).update({
                event_id: eventId,
                user_id: uid
            });
        }
        else {
            this.db.object("cancellation/" + eventId + "_" + uid).update({
                event_id: eventId,
                user_id: uid,
                reason: reason,
            });
        }
    }
    addUserToEvent(event_id, first_name, last_name, uid) {
        console.log("from firebase service");
        this.db.object("/event/" + event_id).update({
            first_name: first_name,
            last_name: last_name,
            uid: uid,
        });
    }
    addNewBug(description) {
        var a;
        this.bugsRef = this.db.list("bug");
        this.bugs = this.bugsRef
            .snapshotChanges()
            .pipe(Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_2__["map"])((changes) => changes.map((c) => (Object.assign({ id: c.payload.key }, c.payload.val())))));
        this.bugs.subscribe((snapshots) => {
            snapshots.forEach((snapshot) => {
                if (snapshot.id == "count") {
                    console.log(snapshot);
                    a = snapshot.number;
                    console.log(a);
                    a++;
                    this.db.object("/bug/count").update({
                        number: a,
                    });
                    this.db.object("/bug/" + a).update({
                        description: description,
                    });
                }
            });
        });
    }
    addPermanentVolunteer(event_type, user_id, start_date, end_date, frequency) {
        return __awaiter(this, void 0, void 0, function* () {
            const permanent_event_id = event_type +
                "_" +
                start_date.getDate() +
                frequency +
                end_date.getMonth() +
                "_" +
                user_id[0];
            this.db.object("/recurring_events/" + permanent_event_id).update({
                event_type: event_type,
                user_id: user_id[0],
                first_name: user_id[1],
                last_name: user_id[2],
                start_date: start_date,
                end_date: end_date,
                frequency: frequency,
            });
            let validDates = this.getDates(new Date(start_date), new Date(end_date), frequency);
            for (let i = 0; i < validDates.length; i++) {
                let flag = false;
                for (let j = 0; j < this.eventTypesCool[event_type]; j++) {
                    var a = this.db.object("event/" + validDates[i] + event_type + this.pad(j + 1, 2)).valueChanges().subscribe((news) => {
                        //console.log(news.uid);
                        if (news.uid == user_id[0]) {
                            console.log("in here: " + news.uid);
                            flag = true;
                        }
                        else if (flag == false && news.uid == "nan") {
                            flag = true;
                            console.log("in here:" + validDates[i] + event_type + this.pad(j + 1, 2) + " " + flag);
                            this.addUserToEvent(validDates[i] + event_type + this.pad(j + 1, 2), user_id[1], user_id[2], user_id[0]);
                        }
                    });
                    yield this.delay(500);
                }
            }
            console.log("EVENT CREATED");
        });
    }
    delay(ms) {
        return new Promise(resolve => setTimeout(resolve, ms));
    }
    getDates(firstDate, lastDate, freq) {
        let validDates = [];
        //console.log("First date: " + firstDate.toString() + ", Last date: " + lastDate.toString());
        while (firstDate <= lastDate) {
            //push the first Date
            validDates.push(this.getDateNumber(firstDate));
            //console.log(firstDate);
            //console.log(freq);
            let incrementInMilliseconds = (freq) * 7 * 24 * 60 * 60 * 1000;
            firstDate.setTime(firstDate.getTime() + incrementInMilliseconds);
            //console.log(firstDate);
        }
        console.log(validDates);
        return validDates;
    }
    pad(num, size) {
        let s = num + "";
        while (s.length < size)
            s = "0" + s;
        return s;
    }
    getDateString(dateval) {
        var days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
        var months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
        var dayName = days[dateval.getDay()];
        var monthName = months[dateval.getMonth()];
        var dateString = dayName + ", " + monthName + " " + dateval.getDate() + ", " + dateval.getFullYear();
        return dateString;
    }
    getDateNumber(date) {
        let month = "";
        let day = "";
        if (date.getMonth() + 1 < 10) {
            month = "0" + (date.getMonth() + 1).toString();
        }
        else {
            month = (date.getMonth() + 1).toString();
        }
        if (date.getDate() < 10) {
            day = "0" + date.getDate().toString();
        }
        else {
            day = date.getDate().toString();
        }
        let dateString = (date.getFullYear().toString()).substring(2, 4) + month + day;
        let intDate = +dateString;
        return intDate;
    }
    addPermanentVolunteerEvents(associatedPermanentEvents, user_id, first_name, last_name, permanent_event_id) {
        for (let i = 0; i < associatedPermanentEvents.length; i++) {
            this.db.object("/event/" + associatedPermanentEvents[i]).update({
                first_name: first_name,
                last_name: last_name,
                uid: user_id,
                permanent_event_id: permanent_event_id,
            });
        }
    }
    removePermanentVolunteer(permanent_event_id) {
        this.db.object("/permanent_events/" + permanent_event_id).remove();
    }
    removePermanentVolunteerEvents(event_id) {
        console.log(event_id);
        console.log(this.db.object("/event/" + event_id + "/permanent_event_id").remove());
    }
    addStaffNoteToEvent(event_id, staff_note) {
        this.db.object("/event/" + event_id).update({
            staff_note: staff_note,
        });
    }
    updateEventNote(event_id, event_note) {
        this.db.object("/event/" + event_id).update({
            event_note: event_note,
        });
    }
    getCancelledEvents() {
        this.eventRef = this.db.list("cancellation");
        this.cancelledEvents = this.eventRef
            .snapshotChanges()
            .pipe(Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_2__["map"])((changes) => changes.map((c) => (Object.assign({ id: c.payload.key }, c.payload.val())))));
        return this.cancelledEvents;
    }
    changeActiveStatus(userid, isActive) {
        this.db.object("/user/" + userid).update({
            active_status: isActive,
        });
    }
};
FirebaseService.ctorParameters = () => [
    { type: _angular_fire_database__WEBPACK_IMPORTED_MODULE_1__["AngularFireDatabase"] }
];
FirebaseService = __decorate([
    Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["Injectable"])({
        providedIn: "root",
    }),
    __metadata("design:paramtypes", [_angular_fire_database__WEBPACK_IMPORTED_MODULE_1__["AngularFireDatabase"]])
], FirebaseService);



/***/ }),

/***/ "./src/app/mark-important-event/mark-important-event.component.scss":
/*!**************************************************************************!*\
  !*** ./src/app/mark-important-event/mark-important-event.component.scss ***!
  \**************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony default export */ __webpack_exports__["default"] = ("::ng-deep .my-class .modal-dialog {\n  max-width: 40%;\n  width: 40%;\n}\n\n.modal-header {\n  background-color: #ff3547;\n}\n\n.modal-title {\n  color: white;\n}\n\n.modal-body {\n  padding: 1rem 2rem 0 2rem;\n}\n\n.form {\n  padding-bottom: 0;\n}\n\n.footer {\n  padding-bottom: 2.5rem;\n  text-align: center;\n}\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi9Vc2Vycy9iZW5qYW1pbmVtaWxpYW5pL1NhbnRyb3BvbHJvdWxhbnQvYW5ndWxhci1lbGVjdHJvbi9zcmMvYXBwL21hcmstaW1wb3J0YW50LWV2ZW50L21hcmstaW1wb3J0YW50LWV2ZW50LmNvbXBvbmVudC5zY3NzIiwic3JjL2FwcC9tYXJrLWltcG9ydGFudC1ldmVudC9tYXJrLWltcG9ydGFudC1ldmVudC5jb21wb25lbnQuc2NzcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQTtFQUNLLGNBQUE7RUFDQSxVQUFBO0FDQ0w7O0FERUE7RUFDRSx5QkFBQTtBQ0NGOztBREVBO0VBQ0UsWUFBQTtBQ0NGOztBREVBO0VBQ0UseUJBQUE7QUNDRjs7QURFQTtFQUNFLGlCQUFBO0FDQ0Y7O0FERUE7RUFDRSxzQkFBQTtFQUNBLGtCQUFBO0FDQ0YiLCJmaWxlIjoic3JjL2FwcC9tYXJrLWltcG9ydGFudC1ldmVudC9tYXJrLWltcG9ydGFudC1ldmVudC5jb21wb25lbnQuc2NzcyIsInNvdXJjZXNDb250ZW50IjpbIjo6bmctZGVlcCAubXktY2xhc3MgLm1vZGFsLWRpYWxvZyB7XG4gICAgIG1heC13aWR0aDogNDAlO1xuICAgICB3aWR0aDogNDAlO1xufVxuXG4ubW9kYWwtaGVhZGVye1xuICBiYWNrZ3JvdW5kLWNvbG9yOiAjZmYzNTQ3O1xufVxuXG4ubW9kYWwtdGl0bGV7XG4gIGNvbG9yOiB3aGl0ZTtcbn1cblxuLm1vZGFsLWJvZHl7XG4gIHBhZGRpbmc6IDFyZW0gMnJlbSAwIDJyZW07XG59XG5cbi5mb3Jte1xuICBwYWRkaW5nLWJvdHRvbTogMDtcbn1cblxuLmZvb3RlcntcbiAgcGFkZGluZy1ib3R0b206Mi41cmVtO1xuICB0ZXh0LWFsaWduOmNlbnRlcjtcbn1cbiIsIjo6bmctZGVlcCAubXktY2xhc3MgLm1vZGFsLWRpYWxvZyB7XG4gIG1heC13aWR0aDogNDAlO1xuICB3aWR0aDogNDAlO1xufVxuXG4ubW9kYWwtaGVhZGVyIHtcbiAgYmFja2dyb3VuZC1jb2xvcjogI2ZmMzU0Nztcbn1cblxuLm1vZGFsLXRpdGxlIHtcbiAgY29sb3I6IHdoaXRlO1xufVxuXG4ubW9kYWwtYm9keSB7XG4gIHBhZGRpbmc6IDFyZW0gMnJlbSAwIDJyZW07XG59XG5cbi5mb3JtIHtcbiAgcGFkZGluZy1ib3R0b206IDA7XG59XG5cbi5mb290ZXIge1xuICBwYWRkaW5nLWJvdHRvbTogMi41cmVtO1xuICB0ZXh0LWFsaWduOiBjZW50ZXI7XG59Il19 */");

/***/ }),

/***/ "./src/app/mark-important-event/mark-important-event.component.ts":
/*!************************************************************************!*\
  !*** ./src/app/mark-important-event/mark-important-event.component.ts ***!
  \************************************************************************/
/*! exports provided: MarkImportantEventComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "MarkImportantEventComponent", function() { return MarkImportantEventComponent; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/__ivy_ngcc__/fesm2015/core.js");
/* harmony import */ var _ng_bootstrap_ng_bootstrap__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @ng-bootstrap/ng-bootstrap */ "./node_modules/@ng-bootstrap/ng-bootstrap/__ivy_ngcc__/fesm2015/ng-bootstrap.js");
/* harmony import */ var _angular_fire_database__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/fire/database */ "./node_modules/@angular/fire/__ivy_ngcc__/fesm2015/angular-fire-database.js");
/* harmony import */ var _angular_forms__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @angular/forms */ "./node_modules/@angular/forms/__ivy_ngcc__/fesm2015/forms.js");
/* harmony import */ var rxjs_operators__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! rxjs/operators */ "./node_modules/rxjs/_esm2015/operators/index.js");
var __decorate = (undefined && undefined.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (undefined && undefined.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __importDefault = (undefined && undefined.__importDefault) || function (mod) {
  return (mod && mod.__esModule) ? mod : { "default": mod };
};





let MarkImportantEventComponent = class MarkImportantEventComponent {
    constructor(modalService, db, formBuilder) {
        this.modalService = modalService;
        this.db = db;
        this.formBuilder = formBuilder;
        this.model = {};
        this.eventTypes = { 'Kitchen AM': 'kitam', 'Kitchen PM': 'kitpm', 'Meal Delivery': 'deliv', 'Meal Delivery Driver': 'deldr' };
        this.eventDates = {};
        this.eventsRef = db.list('event');
        this.events = this.eventsRef.snapshotChanges().pipe(Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_4__["map"])(changes => changes.map(c => (Object.assign({ id: c.payload.key }, c.payload.val())))));
        this.formatEventDates();
    }
    ngOnInit() {
        this.form = this.formBuilder.group({
            event_type: ['', _angular_forms__WEBPACK_IMPORTED_MODULE_3__["Validators"].required],
            event_date: ['', _angular_forms__WEBPACK_IMPORTED_MODULE_3__["Validators"].required]
        });
    }
    open(content) {
        this.modalReference = this.modalService.open(content, { ariaLabelledBy: 'modal-basic-title', size: 'sm', windowClass: 'my-class', centered: true });
    }
    formatEventDates() {
        this.events.subscribe(snapshots => {
            snapshots.forEach(snapshot => {
                var event_date = snapshot.event_date.toString();
                var event_type = snapshot.event_type.toString();
                event_date = this.formatDate(event_date);
                if (!(event_date in this.eventDates)) {
                    this.eventDates[event_date] = {};
                    this.eventDates[event_date][event_type] = [snapshot.id];
                }
                else {
                    if (!(event_type in this.eventDates[event_date])) {
                        this.eventDates[event_date][event_type] = [snapshot.id];
                    }
                    else {
                        this.eventDates[event_date][event_type].push(snapshot.id);
                    }
                }
            });
        });
    }
    formatDate(date) {
        const year = "20" + date.substring(0, 2);
        const month = date.substring(2, 4);
        const day = date.substring(4, 6);
        date = month + '/' + day + '/' + year;
        return date;
    }
    formatEventType(event_type) {
    }
    onSubmit() {
        this.form.markAllAsTouched();
        if (this.form.valid) {
            this.modalReference.close();
            const event_date = this.model.event_date;
            const event_type = this.model.event_type;
            this.markImportantEvents(event_date, event_type);
            this.form.reset();
            this.model = {};
        }
    }
    markImportantEvents(event_date, event_type) {
        var event_type = this.eventTypes[event_type];
        var important_events = this.eventDates[event_date][event_type];
        for (var event of important_events) {
            this.markEventAsImportant(event);
        }
    }
    markEventAsImportant(event_id) {
        this.db.object('/event/' + event_id).update({
            is_important_event: true
        });
    }
};
MarkImportantEventComponent.ctorParameters = () => [
    { type: _ng_bootstrap_ng_bootstrap__WEBPACK_IMPORTED_MODULE_1__["NgbModal"] },
    { type: _angular_fire_database__WEBPACK_IMPORTED_MODULE_2__["AngularFireDatabase"] },
    { type: _angular_forms__WEBPACK_IMPORTED_MODULE_3__["FormBuilder"] }
];
MarkImportantEventComponent = __decorate([
    Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["Component"])({
        selector: 'app-mark-important-event',
        template: __importDefault(__webpack_require__(/*! raw-loader!./mark-important-event.component.html */ "./node_modules/raw-loader/dist/cjs.js!./src/app/mark-important-event/mark-important-event.component.html")).default,
        styles: [__importDefault(__webpack_require__(/*! ./mark-important-event.component.scss */ "./src/app/mark-important-event/mark-important-event.component.scss")).default]
    }),
    __metadata("design:paramtypes", [_ng_bootstrap_ng_bootstrap__WEBPACK_IMPORTED_MODULE_1__["NgbModal"], _angular_fire_database__WEBPACK_IMPORTED_MODULE_2__["AngularFireDatabase"], _angular_forms__WEBPACK_IMPORTED_MODULE_3__["FormBuilder"]])
], MarkImportantEventComponent);



/***/ }),

/***/ "./src/app/new-user/new-user.component.scss":
/*!**************************************************!*\
  !*** ./src/app/new-user/new-user.component.scss ***!
  \**************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony default export */ __webpack_exports__["default"] = ("::ng-deep .cdk-overlay-container {\n  z-index: 2000;\n}\n\n.modal-header {\n  background-color: #5fce99;\n}\n\n.modal-title {\n  color: white;\n}\n\n.modal-body {\n  padding: 1rem 2rem 0 2rem;\n}\n\n.form {\n  padding-bottom: 0;\n}\n\n.form-section {\n  margin-bottom: 1.5rem;\n  color: darkgrey;\n  margin-top: 1.5rem;\n}\n\n.footer {\n  padding-bottom: 2.5rem;\n  text-align: center;\n}\n\n.btn-add-volunteer {\n  color: #5fce99 !important;\n  border-color: #5fce99 !important;\n}\n\n.btn-add-volunteer:hover {\n  background-color: #5fce99 !important;\n  color: white !important;\n}\n\n.close:focus {\n  outline: none;\n}\n\n.btn-add:focus {\n  outline: none;\n}\n\n.btn-add {\n  color: #5fce99;\n  transform: scale(1.5);\n  margin-left: -50px;\n}\n\nhr {\n  display: block;\n  margin: 10px 0 10px 0;\n  border-top: 1px solid rgba(0, 0, 0, 0.12);\n  width: 100%;\n}\n\nmat-icon {\n  font-size: 30px;\n}\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi9Vc2Vycy9iZW5qYW1pbmVtaWxpYW5pL1NhbnRyb3BvbHJvdWxhbnQvYW5ndWxhci1lbGVjdHJvbi9zcmMvYXBwL25ldy11c2VyL25ldy11c2VyLmNvbXBvbmVudC5zY3NzIiwic3JjL2FwcC9uZXctdXNlci9uZXctdXNlci5jb21wb25lbnQuc2NzcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQTtFQUNFLGFBQUE7QUNDRjs7QURFQTtFQUNFLHlCQUFBO0FDQ0Y7O0FERUE7RUFDRSxZQUFBO0FDQ0Y7O0FERUE7RUFDRSx5QkFBQTtBQ0NGOztBREVBO0VBQ0UsaUJBQUE7QUNDRjs7QURFQTtFQUNFLHFCQUFBO0VBQ0EsZUFBQTtFQUNBLGtCQUFBO0FDQ0Y7O0FERUE7RUFDRSxzQkFBQTtFQUNBLGtCQUFBO0FDQ0Y7O0FERUE7RUFDRSx5QkFBQTtFQUNBLGdDQUFBO0FDQ0Y7O0FERUE7RUFDRSxvQ0FBQTtFQUNBLHVCQUFBO0FDQ0Y7O0FERUE7RUFDRSxhQUFBO0FDQ0Y7O0FERUE7RUFDRSxhQUFBO0FDQ0Y7O0FERUE7RUFDRSxjQUFBO0VBQ0EscUJBQUE7RUFDQSxrQkFBQTtBQ0NGOztBREVBO0VBQ0UsY0FBQTtFQUNBLHFCQUFBO0VBQ0EseUNBQUE7RUFDQSxXQUFBO0FDQ0Y7O0FERUE7RUFDRSxlQUFBO0FDQ0YiLCJmaWxlIjoic3JjL2FwcC9uZXctdXNlci9uZXctdXNlci5jb21wb25lbnQuc2NzcyIsInNvdXJjZXNDb250ZW50IjpbIjo6bmctZGVlcCAuY2RrLW92ZXJsYXktY29udGFpbmVyIHtcbiAgei1pbmRleDogMjAwMDtcbn1cblxuLm1vZGFsLWhlYWRlciB7XG4gIGJhY2tncm91bmQtY29sb3I6ICM1ZmNlOTk7XG59XG5cbi5tb2RhbC10aXRsZSB7XG4gIGNvbG9yOiB3aGl0ZTtcbn1cblxuLm1vZGFsLWJvZHkge1xuICBwYWRkaW5nOiAxcmVtIDJyZW0gMCAycmVtO1xufVxuXG4uZm9ybSB7XG4gIHBhZGRpbmctYm90dG9tOiAwO1xufVxuXG4uZm9ybS1zZWN0aW9uIHtcbiAgbWFyZ2luLWJvdHRvbTogMS41cmVtO1xuICBjb2xvcjogZGFya2dyZXk7XG4gIG1hcmdpbi10b3A6IDEuNXJlbTtcbn1cblxuLmZvb3RlciB7XG4gIHBhZGRpbmctYm90dG9tOiAyLjVyZW07XG4gIHRleHQtYWxpZ246IGNlbnRlcjtcbn1cblxuLmJ0bi1hZGQtdm9sdW50ZWVyIHtcbiAgY29sb3I6ICM1ZmNlOTkgIWltcG9ydGFudDtcbiAgYm9yZGVyLWNvbG9yOiAjNWZjZTk5ICFpbXBvcnRhbnQ7XG59XG5cbi5idG4tYWRkLXZvbHVudGVlcjpob3ZlciB7XG4gIGJhY2tncm91bmQtY29sb3I6ICM1ZmNlOTkgIWltcG9ydGFudDtcbiAgY29sb3I6IHdoaXRlICFpbXBvcnRhbnQ7XG59XG5cbi5jbG9zZTpmb2N1cyB7XG4gIG91dGxpbmU6IG5vbmU7XG59XG5cbi5idG4tYWRkOmZvY3VzIHtcbiAgb3V0bGluZTogbm9uZTtcbn1cblxuLmJ0bi1hZGQge1xuICBjb2xvcjogIzVmY2U5OTtcbiAgdHJhbnNmb3JtOiBzY2FsZSgxLjUpO1xuICBtYXJnaW4tbGVmdDogLTUwcHg7XG59XG5cbmhyIHtcbiAgZGlzcGxheTogYmxvY2s7XG4gIG1hcmdpbjogMTBweCAwIDEwcHggMDtcbiAgYm9yZGVyLXRvcDogMXB4IHNvbGlkIHJnYmEoMCwgMCwgMCwgMC4xMik7XG4gIHdpZHRoOiAxMDAlO1xufVxuXG5tYXQtaWNvbiB7XG4gIGZvbnQtc2l6ZTogMzBweDtcbn1cbiIsIjo6bmctZGVlcCAuY2RrLW92ZXJsYXktY29udGFpbmVyIHtcbiAgei1pbmRleDogMjAwMDtcbn1cblxuLm1vZGFsLWhlYWRlciB7XG4gIGJhY2tncm91bmQtY29sb3I6ICM1ZmNlOTk7XG59XG5cbi5tb2RhbC10aXRsZSB7XG4gIGNvbG9yOiB3aGl0ZTtcbn1cblxuLm1vZGFsLWJvZHkge1xuICBwYWRkaW5nOiAxcmVtIDJyZW0gMCAycmVtO1xufVxuXG4uZm9ybSB7XG4gIHBhZGRpbmctYm90dG9tOiAwO1xufVxuXG4uZm9ybS1zZWN0aW9uIHtcbiAgbWFyZ2luLWJvdHRvbTogMS41cmVtO1xuICBjb2xvcjogZGFya2dyZXk7XG4gIG1hcmdpbi10b3A6IDEuNXJlbTtcbn1cblxuLmZvb3RlciB7XG4gIHBhZGRpbmctYm90dG9tOiAyLjVyZW07XG4gIHRleHQtYWxpZ246IGNlbnRlcjtcbn1cblxuLmJ0bi1hZGQtdm9sdW50ZWVyIHtcbiAgY29sb3I6ICM1ZmNlOTkgIWltcG9ydGFudDtcbiAgYm9yZGVyLWNvbG9yOiAjNWZjZTk5ICFpbXBvcnRhbnQ7XG59XG5cbi5idG4tYWRkLXZvbHVudGVlcjpob3ZlciB7XG4gIGJhY2tncm91bmQtY29sb3I6ICM1ZmNlOTkgIWltcG9ydGFudDtcbiAgY29sb3I6IHdoaXRlICFpbXBvcnRhbnQ7XG59XG5cbi5jbG9zZTpmb2N1cyB7XG4gIG91dGxpbmU6IG5vbmU7XG59XG5cbi5idG4tYWRkOmZvY3VzIHtcbiAgb3V0bGluZTogbm9uZTtcbn1cblxuLmJ0bi1hZGQge1xuICBjb2xvcjogIzVmY2U5OTtcbiAgdHJhbnNmb3JtOiBzY2FsZSgxLjUpO1xuICBtYXJnaW4tbGVmdDogLTUwcHg7XG59XG5cbmhyIHtcbiAgZGlzcGxheTogYmxvY2s7XG4gIG1hcmdpbjogMTBweCAwIDEwcHggMDtcbiAgYm9yZGVyLXRvcDogMXB4IHNvbGlkIHJnYmEoMCwgMCwgMCwgMC4xMik7XG4gIHdpZHRoOiAxMDAlO1xufVxuXG5tYXQtaWNvbiB7XG4gIGZvbnQtc2l6ZTogMzBweDtcbn0iXX0= */");

/***/ }),

/***/ "./src/app/new-user/new-user.component.ts":
/*!************************************************!*\
  !*** ./src/app/new-user/new-user.component.ts ***!
  \************************************************/
/*! exports provided: NewUserComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "NewUserComponent", function() { return NewUserComponent; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/__ivy_ngcc__/fesm2015/core.js");
/* harmony import */ var _ng_bootstrap_ng_bootstrap__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @ng-bootstrap/ng-bootstrap */ "./node_modules/@ng-bootstrap/ng-bootstrap/__ivy_ngcc__/fesm2015/ng-bootstrap.js");
/* harmony import */ var _shared_models_user__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../shared/models/user */ "./src/app/shared/models/user.ts");
/* harmony import */ var _angular_fire_database__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @angular/fire/database */ "./node_modules/@angular/fire/__ivy_ngcc__/fesm2015/angular-fire-database.js");
/* harmony import */ var _angular_common__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @angular/common */ "./node_modules/@angular/common/__ivy_ngcc__/fesm2015/common.js");
/* harmony import */ var _angular_forms__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! @angular/forms */ "./node_modules/@angular/forms/__ivy_ngcc__/fesm2015/forms.js");
var __decorate = (undefined && undefined.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (undefined && undefined.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __importDefault = (undefined && undefined.__importDefault) || function (mod) {
  return (mod && mod.__esModule) ? mod : { "default": mod };
};






let NewUserComponent = class NewUserComponent {
    constructor(modalService, db, formBuilder) {
        this.modalService = modalService;
        this.db = db;
        this.formBuilder = formBuilder;
        this.model = new _shared_models_user__WEBPACK_IMPORTED_MODULE_2__["User"]();
        this.today = new Date();
    }
    ngOnInit() {
        this.model.emergency_contact_name = "";
        this.model.emergency_relationship = "";
        this.model.emergency_contact_number = "";
        var phoneNumPattern = new RegExp("^[0-9]{10}$");
        this.myForm = this.formBuilder.group({
            first_name: ['', _angular_forms__WEBPACK_IMPORTED_MODULE_5__["Validators"].required],
            last_name: ['', _angular_forms__WEBPACK_IMPORTED_MODULE_5__["Validators"].required],
            dob: ['', _angular_forms__WEBPACK_IMPORTED_MODULE_5__["Validators"].required],
            address_number: ['', _angular_forms__WEBPACK_IMPORTED_MODULE_5__["Validators"].required],
            address_street: ['', _angular_forms__WEBPACK_IMPORTED_MODULE_5__["Validators"].required],
            address_city: ['', _angular_forms__WEBPACK_IMPORTED_MODULE_5__["Validators"].required],
            address_postal_code: ['', _angular_forms__WEBPACK_IMPORTED_MODULE_5__["Validators"].required],
            email: ['', _angular_forms__WEBPACK_IMPORTED_MODULE_5__["Validators"].required],
            phone_number: ['', _angular_forms__WEBPACK_IMPORTED_MODULE_5__["Validators"].pattern(phoneNumPattern)],
            emergency_contact_name: [""],
            emergency_relationship: [""],
            emergency_contact_number: [""]
        });
    }
    open(content) {
        this.modalReference = this.modalService.open(content, { ariaLabelledBy: 'modal-basic-title', size: 'lg' });
    }
    newUser(user) {
        user.id = user.first_name.charAt(0).toLowerCase() + user.last_name.charAt(0).toLowerCase() + user.phone_number;
        this.db.object('/user/' + user.id)
            .update({
            address_city: user.address_city,
            address_number: user.address_number,
            address_postal_code: user.address_postal_code,
            address_street: user.address_street,
            dob: user.dob,
            email: user.email,
            first_name: user.first_name,
            key: user.id,
            active_status: true,
            last_name: user.last_name,
            no_show: 0,
            phone_number: user.phone_number,
            emergency_contact_number: user.emergency_contact_number,
            emergency_contact_name: user.emergency_contact_name,
            emergency_relationship: user.emergency_relationship,
            signup_date: Object(_angular_common__WEBPACK_IMPORTED_MODULE_4__["formatDate"])(new Date(), 'yy/MM/dd', 'en'),
            cancellations: 0
        });
    }
    onSubmit(f) {
        this.myForm.markAllAsTouched();
        if (this.myForm.valid) {
            this.modalReference.close();
            this.newUser(this.model);
            this.model = new _shared_models_user__WEBPACK_IMPORTED_MODULE_2__["User"]();
            this.myForm.reset();
        }
    }
};
NewUserComponent.ctorParameters = () => [
    { type: _ng_bootstrap_ng_bootstrap__WEBPACK_IMPORTED_MODULE_1__["NgbModal"] },
    { type: _angular_fire_database__WEBPACK_IMPORTED_MODULE_3__["AngularFireDatabase"] },
    { type: _angular_forms__WEBPACK_IMPORTED_MODULE_5__["FormBuilder"] }
];
NewUserComponent = __decorate([
    Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["Component"])({
        selector: 'app-new-user',
        template: __importDefault(__webpack_require__(/*! raw-loader!./new-user.component.html */ "./node_modules/raw-loader/dist/cjs.js!./src/app/new-user/new-user.component.html")).default,
        styles: [__importDefault(__webpack_require__(/*! ./new-user.component.scss */ "./src/app/new-user/new-user.component.scss")).default]
    }),
    __metadata("design:paramtypes", [_ng_bootstrap_ng_bootstrap__WEBPACK_IMPORTED_MODULE_1__["NgbModal"], _angular_fire_database__WEBPACK_IMPORTED_MODULE_3__["AngularFireDatabase"], _angular_forms__WEBPACK_IMPORTED_MODULE_5__["FormBuilder"]])
], NewUserComponent);



/***/ }),

/***/ "./src/app/permanent-volunteer-directory/permanent-volunteer-directory.component.scss":
/*!********************************************************************************************!*\
  !*** ./src/app/permanent-volunteer-directory/permanent-volunteer-directory.component.scss ***!
  \********************************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony default export */ __webpack_exports__["default"] = ("::ng-deep .permanent-volunteer-directory .modal-dialog {\n  max-width: 80% !important;\n  width: 80% !important;\n}\n\n::ng-deep .cdk-global-overlay-wrapper, ::ng-deep .cdk-overlay-container {\n  z-index: 9999 !important;\n}\n\n.cdk-overlay-connected-position-bounding-box {\n  z-index: 99999 !important;\n}\n\n.fa {\n  padding-right: 0.5rem;\n}\n\n.form {\n  padding-bottom: 0;\n}\n\n.modal-header {\n  background-color: #5fce99;\n}\n\n.modal-title {\n  color: white;\n}\n\n.img-warning {\n  margin-bottom: 1rem;\n  margin: auto;\n  margin-top: 1.5rem;\n}\n\n.modal-body {\n  padding: 1rem 2rem 0 2rem;\n  padding-top: 2rem;\n  padding-bottom: 2rem;\n}\n\n.btn-cancel {\n  margin-right: 1rem;\n}\n\n.btn-remove-volunteer {\n  color: white;\n  background: #dc3545;\n}\n\n.btn-remove-volunteer:hover {\n  background: #bb202f;\n}\n\n.footer {\n  padding-bottom: 2.5rem;\n  text-align: center;\n}\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi9Vc2Vycy9iZW5qYW1pbmVtaWxpYW5pL1NhbnRyb3BvbHJvdWxhbnQvYW5ndWxhci1lbGVjdHJvbi9zcmMvYXBwL3Blcm1hbmVudC12b2x1bnRlZXItZGlyZWN0b3J5L3Blcm1hbmVudC12b2x1bnRlZXItZGlyZWN0b3J5LmNvbXBvbmVudC5zY3NzIiwic3JjL2FwcC9wZXJtYW5lbnQtdm9sdW50ZWVyLWRpcmVjdG9yeS9wZXJtYW5lbnQtdm9sdW50ZWVyLWRpcmVjdG9yeS5jb21wb25lbnQuc2NzcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQTtFQUNLLHlCQUFBO0VBQ0EscUJBQUE7QUNDTDs7QURFWTtFQUFzRCx3QkFBQTtBQ0VsRTs7QUREQTtFQUNFLHlCQUFBO0FDSUY7O0FERkE7RUFDRSxxQkFBQTtBQ0tGOztBREZBO0VBQ0UsaUJBQUE7QUNLRjs7QURGQTtFQUNFLHlCQUFBO0FDS0Y7O0FEREE7RUFDRSxZQUFBO0FDSUY7O0FEREE7RUFDRSxtQkFBQTtFQUNBLFlBQUE7RUFDQSxrQkFBQTtBQ0lGOztBRERBO0VBQ0UseUJBQUE7RUFDQSxpQkFBQTtFQUNBLG9CQUFBO0FDSUY7O0FERkE7RUFDRSxrQkFBQTtBQ0tGOztBREZBO0VBQ0UsWUFBQTtFQUNBLG1CQUFBO0FDS0Y7O0FERkE7RUFDRSxtQkFBQTtBQ0tGOztBREZBO0VBQ0Usc0JBQUE7RUFDQSxrQkFBQTtBQ0tGIiwiZmlsZSI6InNyYy9hcHAvcGVybWFuZW50LXZvbHVudGVlci1kaXJlY3RvcnkvcGVybWFuZW50LXZvbHVudGVlci1kaXJlY3RvcnkuY29tcG9uZW50LnNjc3MiLCJzb3VyY2VzQ29udGVudCI6WyI6Om5nLWRlZXAgLnBlcm1hbmVudC12b2x1bnRlZXItZGlyZWN0b3J5IC5tb2RhbC1kaWFsb2cge1xuICAgICBtYXgtd2lkdGg6IDgwJSAhaW1wb3J0YW50O1xuICAgICB3aWR0aDogODAlICFpbXBvcnRhbnQ7XG5cbn1cbjo6bmctZGVlcCB7IC5jZGstZ2xvYmFsLW92ZXJsYXktd3JhcHBlciwgLmNkay1vdmVybGF5LWNvbnRhaW5lciB7IHotaW5kZXg6IDk5OTkhaW1wb3J0YW50OyB9IH1cbi5jZGstb3ZlcmxheS1jb25uZWN0ZWQtcG9zaXRpb24tYm91bmRpbmctYm94IHtcbiAgei1pbmRleDogOTk5OTkgIWltcG9ydGFudDtcbn1cbi5mYSB7XG4gIHBhZGRpbmctcmlnaHQ6IDAuNXJlbTtcbn1cblxuLmZvcm17XG4gIHBhZGRpbmctYm90dG9tOiAwO1xufVxuXG4ubW9kYWwtaGVhZGVye1xuICBiYWNrZ3JvdW5kLWNvbG9yOiAjNWZjZTk5O1xufVxuXG5cbi5tb2RhbC10aXRsZXtcbiAgY29sb3I6IHdoaXRlO1xufVxuXG4uaW1nLXdhcm5pbmcge1xuICBtYXJnaW4tYm90dG9tOjFyZW07XG4gIG1hcmdpbjphdXRvO1xuICBtYXJnaW4tdG9wOiAxLjVyZW07XG59XG5cbi5tb2RhbC1ib2R5e1xuICBwYWRkaW5nOiAxcmVtIDJyZW0gMCAycmVtO1xuICBwYWRkaW5nLXRvcDoycmVtO1xuICBwYWRkaW5nLWJvdHRvbToycmVtO1xufVxuLmJ0bi1jYW5jZWwge1xuICBtYXJnaW4tcmlnaHQ6MXJlbTtcbn1cblxuLmJ0bi1yZW1vdmUtdm9sdW50ZWVyIHtcbiAgY29sb3I6d2hpdGU7XG4gIGJhY2tncm91bmQ6I2RjMzU0NTtcbn1cblxuLmJ0bi1yZW1vdmUtdm9sdW50ZWVyOmhvdmVyIHtcbiAgYmFja2dyb3VuZDogI2JiMjAyZjtcbn1cblxuLmZvb3RlcntcbiAgcGFkZGluZy1ib3R0b206IDIuNXJlbTtcbiAgdGV4dC1hbGlnbjogY2VudGVyO1xufVxuIiwiOjpuZy1kZWVwIC5wZXJtYW5lbnQtdm9sdW50ZWVyLWRpcmVjdG9yeSAubW9kYWwtZGlhbG9nIHtcbiAgbWF4LXdpZHRoOiA4MCUgIWltcG9ydGFudDtcbiAgd2lkdGg6IDgwJSAhaW1wb3J0YW50O1xufVxuXG46Om5nLWRlZXAgLmNkay1nbG9iYWwtb3ZlcmxheS13cmFwcGVyLCA6Om5nLWRlZXAgLmNkay1vdmVybGF5LWNvbnRhaW5lciB7XG4gIHotaW5kZXg6IDk5OTkgIWltcG9ydGFudDtcbn1cblxuLmNkay1vdmVybGF5LWNvbm5lY3RlZC1wb3NpdGlvbi1ib3VuZGluZy1ib3gge1xuICB6LWluZGV4OiA5OTk5OSAhaW1wb3J0YW50O1xufVxuXG4uZmEge1xuICBwYWRkaW5nLXJpZ2h0OiAwLjVyZW07XG59XG5cbi5mb3JtIHtcbiAgcGFkZGluZy1ib3R0b206IDA7XG59XG5cbi5tb2RhbC1oZWFkZXIge1xuICBiYWNrZ3JvdW5kLWNvbG9yOiAjNWZjZTk5O1xufVxuXG4ubW9kYWwtdGl0bGUge1xuICBjb2xvcjogd2hpdGU7XG59XG5cbi5pbWctd2FybmluZyB7XG4gIG1hcmdpbi1ib3R0b206IDFyZW07XG4gIG1hcmdpbjogYXV0bztcbiAgbWFyZ2luLXRvcDogMS41cmVtO1xufVxuXG4ubW9kYWwtYm9keSB7XG4gIHBhZGRpbmc6IDFyZW0gMnJlbSAwIDJyZW07XG4gIHBhZGRpbmctdG9wOiAycmVtO1xuICBwYWRkaW5nLWJvdHRvbTogMnJlbTtcbn1cblxuLmJ0bi1jYW5jZWwge1xuICBtYXJnaW4tcmlnaHQ6IDFyZW07XG59XG5cbi5idG4tcmVtb3ZlLXZvbHVudGVlciB7XG4gIGNvbG9yOiB3aGl0ZTtcbiAgYmFja2dyb3VuZDogI2RjMzU0NTtcbn1cblxuLmJ0bi1yZW1vdmUtdm9sdW50ZWVyOmhvdmVyIHtcbiAgYmFja2dyb3VuZDogI2JiMjAyZjtcbn1cblxuLmZvb3RlciB7XG4gIHBhZGRpbmctYm90dG9tOiAyLjVyZW07XG4gIHRleHQtYWxpZ246IGNlbnRlcjtcbn0iXX0= */");

/***/ }),

/***/ "./src/app/permanent-volunteer-directory/permanent-volunteer-directory.component.ts":
/*!******************************************************************************************!*\
  !*** ./src/app/permanent-volunteer-directory/permanent-volunteer-directory.component.ts ***!
  \******************************************************************************************/
/*! exports provided: PermanentVolunteerDirectoryComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "PermanentVolunteerDirectoryComponent", function() { return PermanentVolunteerDirectoryComponent; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/__ivy_ngcc__/fesm2015/core.js");
/* harmony import */ var _ng_bootstrap_ng_bootstrap__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @ng-bootstrap/ng-bootstrap */ "./node_modules/@ng-bootstrap/ng-bootstrap/__ivy_ngcc__/fesm2015/ng-bootstrap.js");
/* harmony import */ var _angular_forms__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/forms */ "./node_modules/@angular/forms/__ivy_ngcc__/fesm2015/forms.js");
/* harmony import */ var _firebase_service_service__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../firebase-service.service */ "./src/app/firebase-service.service.ts");
var __decorate = (undefined && undefined.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (undefined && undefined.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __importDefault = (undefined && undefined.__importDefault) || function (mod) {
  return (mod && mod.__esModule) ? mod : { "default": mod };
};




let PermanentVolunteerDirectoryComponent = class PermanentVolunteerDirectoryComponent {
    constructor(modalService, formBuilder, fs) {
        this.modalService = modalService;
        this.formBuilder = formBuilder;
        this.fs = fs;
        this.active = 1;
        this.volunteers = [];
        this.events = [];
        this.model = {};
        this.today = new Date();
        this.aYearFromNow = new Date();
        this.aYearFromNow.setFullYear(this.aYearFromNow.getFullYear() + 1);
    }
    ngOnInit() {
        this.volunteersObservable = this.fs.getUsers();
        this.eventsObservable = this.fs.getPermanentEvents();
        this.volunteersObservable.subscribe(snapshots => {
            snapshots.forEach(snapshot => {
                this.volunteers.push(snapshot);
            });
        });
        this.eventsObservable.subscribe(snapshots => {
            snapshots.forEach(snapshot => {
                snapshot.start_date = new Date(snapshot.start_date).toLocaleDateString();
                snapshot.end_date = new Date(snapshot.end_date).toLocaleDateString();
                // for(let volunteer in this.volunteers){
                //   console.log(volunteer.key);
                //   console.log(snapshot.user_id);
                //   if(volunteer.key==snapshot.user_id){
                //     snapshot.user_id = volunteer.first_name + ' ' + volunteer.last_name;
                //     console.log(snapshot.user_id);
                //     break;
                //   }
                // }
                this.events.push(snapshot);
            });
        });
        this.addPermanentForm = this.formBuilder.group({
            frequency: ['', _angular_forms__WEBPACK_IMPORTED_MODULE_2__["Validators"].required],
            endDate: ['', _angular_forms__WEBPACK_IMPORTED_MODULE_2__["Validators"].required],
            startDate: ['', _angular_forms__WEBPACK_IMPORTED_MODULE_2__["Validators"].required],
            volunteer: ['', _angular_forms__WEBPACK_IMPORTED_MODULE_2__["Validators"].required],
            eventType: ['', _angular_forms__WEBPACK_IMPORTED_MODULE_2__["Validators"].required]
        });
    }
    endDateRequiredError() {
        return (this.model.endDate == undefined || this.model.endDate == null) || (this.model.endDate < this.model.startDate);
    }
    startDateRequiredError() {
        return this.model.startDate == undefined || this.model.startDate == null;
    }
    open(content) {
        this.modalReference = this.modalService.open(content, { ariaLabelledBy: 'modal-basic-title', size: 'sm', windowClass: 'permanent-volunteer-directory', centered: true });
    }
    delete(eventID) {
        this.fs.removePermanentVolunteer(eventID);
    }
    onSubmit(event) {
        if (event == "remove") {
            this.modalReference.close();
        }
        if (event == "add") {
            this.addPermanentForm.markAllAsTouched();
            if (this.addPermanentForm.valid) {
                this.modalReference.close();
                this.fs.addPermanentVolunteer(this.model.eventType, this.model.volunteer, this.model.startDate, this.model.endDate, this.model.frequency);
                this.addPermanentForm.reset();
                this.model = {};
            }
        }
    }
};
PermanentVolunteerDirectoryComponent.ctorParameters = () => [
    { type: _ng_bootstrap_ng_bootstrap__WEBPACK_IMPORTED_MODULE_1__["NgbModal"] },
    { type: _angular_forms__WEBPACK_IMPORTED_MODULE_2__["FormBuilder"] },
    { type: _firebase_service_service__WEBPACK_IMPORTED_MODULE_3__["FirebaseService"] }
];
PermanentVolunteerDirectoryComponent = __decorate([
    Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["Component"])({
        selector: 'app-permanent-volunteer-directory',
        template: __importDefault(__webpack_require__(/*! raw-loader!./permanent-volunteer-directory.component.html */ "./node_modules/raw-loader/dist/cjs.js!./src/app/permanent-volunteer-directory/permanent-volunteer-directory.component.html")).default,
        styles: [__importDefault(__webpack_require__(/*! ./permanent-volunteer-directory.component.scss */ "./src/app/permanent-volunteer-directory/permanent-volunteer-directory.component.scss")).default]
    }),
    __metadata("design:paramtypes", [_ng_bootstrap_ng_bootstrap__WEBPACK_IMPORTED_MODULE_1__["NgbModal"], _angular_forms__WEBPACK_IMPORTED_MODULE_2__["FormBuilder"], _firebase_service_service__WEBPACK_IMPORTED_MODULE_3__["FirebaseService"]])
], PermanentVolunteerDirectoryComponent);



/***/ }),

/***/ "./src/app/permanent-volunteer/permanent-volunteer.component.scss":
/*!************************************************************************!*\
  !*** ./src/app/permanent-volunteer/permanent-volunteer.component.scss ***!
  \************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony default export */ __webpack_exports__["default"] = ("::ng-deep .permanent-volunteer .modal-dialog {\n  max-width: 80% !important;\n  width: 80% !important;\n}\n\n::ng-deep .cdk-global-overlay-wrapper, ::ng-deep .cdk-overlay-container {\n  z-index: 9999 !important;\n}\n\n.cdk-overlay-connected-position-bounding-box {\n  z-index: 99999 !important;\n}\n\n.fa {\n  padding-right: 0.5rem;\n}\n\n.form {\n  padding-bottom: 0;\n}\n\n.modal-header {\n  background-color: #5fce99;\n}\n\n.modal-title {\n  color: white;\n}\n\n.img-warning {\n  margin-bottom: 1rem;\n  margin: auto;\n  margin-top: 1.5rem;\n}\n\n.modal-body {\n  padding: 1rem 2rem 0 2rem;\n  padding-top: 2rem;\n  padding-bottom: 2rem;\n}\n\n.btn-cancel {\n  margin-right: 1rem;\n}\n\n.btn-remove-volunteer {\n  color: white;\n  background: #dc3545;\n}\n\n.btn-remove-volunteer:hover {\n  background: #bb202f;\n}\n\n.footer {\n  padding-bottom: 2.5rem;\n  text-align: center;\n}\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi9Vc2Vycy9iZW5qYW1pbmVtaWxpYW5pL1NhbnRyb3BvbHJvdWxhbnQvYW5ndWxhci1lbGVjdHJvbi9zcmMvYXBwL3Blcm1hbmVudC12b2x1bnRlZXIvcGVybWFuZW50LXZvbHVudGVlci5jb21wb25lbnQuc2NzcyIsInNyYy9hcHAvcGVybWFuZW50LXZvbHVudGVlci9wZXJtYW5lbnQtdm9sdW50ZWVyLmNvbXBvbmVudC5zY3NzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBO0VBQ0kseUJBQUE7RUFDQSxxQkFBQTtBQ0NKOztBREdJO0VBQ0ksd0JBQUE7QUNBUjs7QURJQTtFQUNJLHlCQUFBO0FDREo7O0FESUE7RUFDSSxxQkFBQTtBQ0RKOztBRElBO0VBQ0ksaUJBQUE7QUNESjs7QURJQTtFQUNJLHlCQUFBO0FDREo7O0FES0E7RUFDSSxZQUFBO0FDRko7O0FES0E7RUFDSSxtQkFBQTtFQUNBLFlBQUE7RUFDQSxrQkFBQTtBQ0ZKOztBREtBO0VBQ0kseUJBQUE7RUFDQSxpQkFBQTtFQUNBLG9CQUFBO0FDRko7O0FES0E7RUFDSSxrQkFBQTtBQ0ZKOztBREtBO0VBQ0ksWUFBQTtFQUNBLG1CQUFBO0FDRko7O0FES0E7RUFDSSxtQkFBQTtBQ0ZKOztBREtBO0VBQ0ksc0JBQUE7RUFDQSxrQkFBQTtBQ0ZKIiwiZmlsZSI6InNyYy9hcHAvcGVybWFuZW50LXZvbHVudGVlci9wZXJtYW5lbnQtdm9sdW50ZWVyLmNvbXBvbmVudC5zY3NzIiwic291cmNlc0NvbnRlbnQiOlsiOjpuZy1kZWVwIC5wZXJtYW5lbnQtdm9sdW50ZWVyIC5tb2RhbC1kaWFsb2cge1xuICAgIG1heC13aWR0aDogODAlICFpbXBvcnRhbnQ7XG4gICAgd2lkdGg6IDgwJSAhaW1wb3J0YW50O1xufVxuXG46Om5nLWRlZXAge1xuICAgIC5jZGstZ2xvYmFsLW92ZXJsYXktd3JhcHBlciwgLmNkay1vdmVybGF5LWNvbnRhaW5lciB7XG4gICAgICAgIHotaW5kZXg6IDk5OTkgIWltcG9ydGFudDtcbiAgICB9XG59XG5cbi5jZGstb3ZlcmxheS1jb25uZWN0ZWQtcG9zaXRpb24tYm91bmRpbmctYm94IHtcbiAgICB6LWluZGV4OiA5OTk5OSAhaW1wb3J0YW50O1xufVxuXG4uZmEge1xuICAgIHBhZGRpbmctcmlnaHQ6IDAuNXJlbTtcbn1cblxuLmZvcm0ge1xuICAgIHBhZGRpbmctYm90dG9tOiAwO1xufVxuXG4ubW9kYWwtaGVhZGVyIHtcbiAgICBiYWNrZ3JvdW5kLWNvbG9yOiAjNWZjZTk5O1xufVxuXG5cbi5tb2RhbC10aXRsZSB7XG4gICAgY29sb3I6IHdoaXRlO1xufVxuXG4uaW1nLXdhcm5pbmcge1xuICAgIG1hcmdpbi1ib3R0b206IDFyZW07XG4gICAgbWFyZ2luOiBhdXRvO1xuICAgIG1hcmdpbi10b3A6IDEuNXJlbTtcbn1cblxuLm1vZGFsLWJvZHkge1xuICAgIHBhZGRpbmc6IDFyZW0gMnJlbSAwIDJyZW07XG4gICAgcGFkZGluZy10b3A6IDJyZW07XG4gICAgcGFkZGluZy1ib3R0b206IDJyZW07XG59XG5cbi5idG4tY2FuY2VsIHtcbiAgICBtYXJnaW4tcmlnaHQ6IDFyZW07XG59XG5cbi5idG4tcmVtb3ZlLXZvbHVudGVlciB7XG4gICAgY29sb3I6IHdoaXRlO1xuICAgIGJhY2tncm91bmQ6ICNkYzM1NDU7XG59XG5cbi5idG4tcmVtb3ZlLXZvbHVudGVlcjpob3ZlciB7XG4gICAgYmFja2dyb3VuZDogI2JiMjAyZjtcbn1cblxuLmZvb3RlciB7XG4gICAgcGFkZGluZy1ib3R0b206IDIuNXJlbTtcbiAgICB0ZXh0LWFsaWduOiBjZW50ZXI7XG59XG4iLCI6Om5nLWRlZXAgLnBlcm1hbmVudC12b2x1bnRlZXIgLm1vZGFsLWRpYWxvZyB7XG4gIG1heC13aWR0aDogODAlICFpbXBvcnRhbnQ7XG4gIHdpZHRoOiA4MCUgIWltcG9ydGFudDtcbn1cblxuOjpuZy1kZWVwIC5jZGstZ2xvYmFsLW92ZXJsYXktd3JhcHBlciwgOjpuZy1kZWVwIC5jZGstb3ZlcmxheS1jb250YWluZXIge1xuICB6LWluZGV4OiA5OTk5ICFpbXBvcnRhbnQ7XG59XG5cbi5jZGstb3ZlcmxheS1jb25uZWN0ZWQtcG9zaXRpb24tYm91bmRpbmctYm94IHtcbiAgei1pbmRleDogOTk5OTkgIWltcG9ydGFudDtcbn1cblxuLmZhIHtcbiAgcGFkZGluZy1yaWdodDogMC41cmVtO1xufVxuXG4uZm9ybSB7XG4gIHBhZGRpbmctYm90dG9tOiAwO1xufVxuXG4ubW9kYWwtaGVhZGVyIHtcbiAgYmFja2dyb3VuZC1jb2xvcjogIzVmY2U5OTtcbn1cblxuLm1vZGFsLXRpdGxlIHtcbiAgY29sb3I6IHdoaXRlO1xufVxuXG4uaW1nLXdhcm5pbmcge1xuICBtYXJnaW4tYm90dG9tOiAxcmVtO1xuICBtYXJnaW46IGF1dG87XG4gIG1hcmdpbi10b3A6IDEuNXJlbTtcbn1cblxuLm1vZGFsLWJvZHkge1xuICBwYWRkaW5nOiAxcmVtIDJyZW0gMCAycmVtO1xuICBwYWRkaW5nLXRvcDogMnJlbTtcbiAgcGFkZGluZy1ib3R0b206IDJyZW07XG59XG5cbi5idG4tY2FuY2VsIHtcbiAgbWFyZ2luLXJpZ2h0OiAxcmVtO1xufVxuXG4uYnRuLXJlbW92ZS12b2x1bnRlZXIge1xuICBjb2xvcjogd2hpdGU7XG4gIGJhY2tncm91bmQ6ICNkYzM1NDU7XG59XG5cbi5idG4tcmVtb3ZlLXZvbHVudGVlcjpob3ZlciB7XG4gIGJhY2tncm91bmQ6ICNiYjIwMmY7XG59XG5cbi5mb290ZXIge1xuICBwYWRkaW5nLWJvdHRvbTogMi41cmVtO1xuICB0ZXh0LWFsaWduOiBjZW50ZXI7XG59Il19 */");

/***/ }),

/***/ "./src/app/permanent-volunteer/permanent-volunteer.component.ts":
/*!**********************************************************************!*\
  !*** ./src/app/permanent-volunteer/permanent-volunteer.component.ts ***!
  \**********************************************************************/
/*! exports provided: PermanentVolunteerComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "PermanentVolunteerComponent", function() { return PermanentVolunteerComponent; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/__ivy_ngcc__/fesm2015/core.js");
/* harmony import */ var _ng_bootstrap_ng_bootstrap__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @ng-bootstrap/ng-bootstrap */ "./node_modules/@ng-bootstrap/ng-bootstrap/__ivy_ngcc__/fesm2015/ng-bootstrap.js");
/* harmony import */ var _angular_forms__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/forms */ "./node_modules/@angular/forms/__ivy_ngcc__/fesm2015/forms.js");
/* harmony import */ var _firebase_service_service__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../firebase-service.service */ "./src/app/firebase-service.service.ts");
var __decorate = (undefined && undefined.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (undefined && undefined.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __importDefault = (undefined && undefined.__importDefault) || function (mod) {
  return (mod && mod.__esModule) ? mod : { "default": mod };
};




let PermanentVolunteerComponent = class PermanentVolunteerComponent {
    constructor(modalService, formBuilder, fs) {
        this.modalService = modalService;
        this.formBuilder = formBuilder;
        this.fs = fs;
        this.active = 1;
        this.volunteers = [];
        this.events = [];
        this.model = {};
        this.today = new Date();
        this.aYearFromNow = new Date();
        this.aYearFromNow.setFullYear(this.aYearFromNow.getFullYear() + 1);
    }
    ngOnInit() {
        this.volunteersObservable = this.fs.getUsers();
        this.eventsObservable = this.fs.getPermanentEvents();
        this.volunteersObservable.subscribe(snapshots => {
            snapshots.forEach(snapshot => {
                this.volunteers.push(snapshot);
            });
        });
        this.eventsObservable.subscribe(snapshots => {
            snapshots.forEach(snapshot => {
                this.events.push(snapshot);
            });
        });
        this.addPermanentForm = this.formBuilder.group({
            frequency: ['', _angular_forms__WEBPACK_IMPORTED_MODULE_2__["Validators"].required],
            endDate: ['', _angular_forms__WEBPACK_IMPORTED_MODULE_2__["Validators"].required],
            startDate: ['', _angular_forms__WEBPACK_IMPORTED_MODULE_2__["Validators"].required],
            volunteer: [['', '', ''], _angular_forms__WEBPACK_IMPORTED_MODULE_2__["Validators"].required],
            eventType: ['', _angular_forms__WEBPACK_IMPORTED_MODULE_2__["Validators"].required]
        });
    }
    endDateRequiredError() {
        return (this.model.endDate == undefined || this.model.endDate == null) || (this.model.endDate < this.model.startDate);
    }
    startDateRequiredError() {
        return this.model.startDate == undefined || this.model.startDate == null;
    }
    open(content) {
        this.modalReference = this.modalService.open(content, { ariaLabelledBy: 'modal-basic-title', size: 'sm', windowClass: 'permanent-volunteer', centered: true });
    }
    onSubmit(event) {
        if (event == "remove") {
            this.modalReference.close();
        }
        if (event == "add") {
            this.addPermanentForm.markAllAsTouched();
            if (this.addPermanentForm.valid) {
                this.modalReference.close();
                this.fs.addPermanentVolunteer(this.model.eventType, this.model.volunteer, this.model.startDate, this.model.endDate, this.model.frequency);
                this.addPermanentForm.reset();
                this.model = {};
            }
        }
    }
};
PermanentVolunteerComponent.ctorParameters = () => [
    { type: _ng_bootstrap_ng_bootstrap__WEBPACK_IMPORTED_MODULE_1__["NgbModal"] },
    { type: _angular_forms__WEBPACK_IMPORTED_MODULE_2__["FormBuilder"] },
    { type: _firebase_service_service__WEBPACK_IMPORTED_MODULE_3__["FirebaseService"] }
];
PermanentVolunteerComponent = __decorate([
    Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["Component"])({
        selector: 'app-permanent-volunteer',
        template: __importDefault(__webpack_require__(/*! raw-loader!./permanent-volunteer.component.html */ "./node_modules/raw-loader/dist/cjs.js!./src/app/permanent-volunteer/permanent-volunteer.component.html")).default,
        styles: [__importDefault(__webpack_require__(/*! ./permanent-volunteer.component.scss */ "./src/app/permanent-volunteer/permanent-volunteer.component.scss")).default]
    }),
    __metadata("design:paramtypes", [_ng_bootstrap_ng_bootstrap__WEBPACK_IMPORTED_MODULE_1__["NgbModal"], _angular_forms__WEBPACK_IMPORTED_MODULE_2__["FormBuilder"], _firebase_service_service__WEBPACK_IMPORTED_MODULE_3__["FirebaseService"]])
], PermanentVolunteerComponent);



/***/ }),

/***/ "./src/app/service/auth.service.ts":
/*!*****************************************!*\
  !*** ./src/app/service/auth.service.ts ***!
  \*****************************************/
/*! exports provided: AuthService */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "AuthService", function() { return AuthService; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/__ivy_ngcc__/fesm2015/core.js");
/* harmony import */ var _angular_fire_auth__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/fire/auth */ "./node_modules/@angular/fire/__ivy_ngcc__/fesm2015/angular-fire-auth.js");
/* harmony import */ var _angular_fire_database__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/fire/database */ "./node_modules/@angular/fire/__ivy_ngcc__/fesm2015/angular-fire-database.js");
/* harmony import */ var rxjs_operators__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! rxjs/operators */ "./node_modules/rxjs/_esm2015/operators/index.js");
/* harmony import */ var _firebase_app__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @firebase/app */ "./node_modules/@firebase/app/dist/index.cjs.js");
/* harmony import */ var _firebase_app__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(_firebase_app__WEBPACK_IMPORTED_MODULE_4__);
/* harmony import */ var _firebase_auth__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! @firebase/auth */ "./node_modules/@firebase/auth/dist/auth.esm.js");
/* harmony import */ var rxjs__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! rxjs */ "./node_modules/rxjs/_esm2015/index.js");
var __decorate = (undefined && undefined.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (undefined && undefined.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __awaiter = (undefined && undefined.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (undefined && undefined.__importDefault) || function (mod) {
  return (mod && mod.__esModule) ? mod : { "default": mod };
};







let AuthService = class AuthService {
    constructor(firebaseAuth, db) {
        //this.user = firebaseAuth.authState;
        this.firebaseAuth = firebaseAuth;
        this.db = db;
        this.authStatusSub = new rxjs__WEBPACK_IMPORTED_MODULE_6__["BehaviorSubject"](this.currentUser);
        this.currentAuthStatus = this.authStatusSub.asObservable();
        this.error = "";
        this.firebaseAuth.onAuthStateChanged((credential) => {
            if (credential) {
                console.log(credential);
                this.authStatusSub.next(credential);
                console.log('User is logged in');
            }
            else {
                this.authStatusSub.next(null);
                console.log('User is logged out');
            }
        });
    }
    signup(firstName, lastName, email, password, code) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield this.db.object('/registration_code').valueChanges().pipe(Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_3__["take"])(1)).toPromise().then(details => {
                if (details == code) {
                    return this.firebaseAuth
                        .createUserWithEmailAndPassword(email, password)
                        .then((value) => __awaiter(this, void 0, void 0, function* () {
                        console.log('Success!', value);
                        //firebase.auth().currentUser.sendEmailVerification();
                        this.newUser = yield this.firebaseAuth.currentUser;
                        this.addUser(this.newUser.uid, firstName, lastName, email, "staff");
                        this.newUser.sendEmailVerification().then(() => {
                            console.log('email sent');
                        });
                        return true;
                    }))
                        .catch(err => {
                        this.error = err.message;
                        console.log('Something went wrong:', err.message);
                        return false;
                    });
                }
                else {
                    this.error = "Registration code is incorrect.";
                    return false;
                }
            });
        });
    }
    login(email, password) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield this.firebaseAuth.setPersistence(_firebase_app__WEBPACK_IMPORTED_MODULE_4___default.a.auth.Auth.Persistence.LOCAL).then(() => {
                return this.firebaseAuth
                    .signInWithEmailAndPassword(email, password)
                    .then(value => {
                    console.log('Nice, it worked!');
                    return true;
                })
                    .catch(err => {
                    console.log('Something went wrong:', err.message);
                    return false;
                });
            })
                .catch((error) => {
                let errorCode = error.code;
                let errorMessage = error.message;
                console.error(errorCode, errorMessage);
                return false;
            });
        });
    }
    logout() {
        this.firebaseAuth.signOut();
    }
    reset(email) {
        this.firebaseAuth.sendPasswordResetEmail(email);
    }
    addUser(uid, firstName, lastName, email, privilege) {
        this.db.object('/staff/' + uid)
            .update({
            email: email,
            first_name: firstName,
            last_name: lastName,
            privilege: privilege,
        });
    }
};
AuthService.ctorParameters = () => [
    { type: _angular_fire_auth__WEBPACK_IMPORTED_MODULE_1__["AngularFireAuth"] },
    { type: _angular_fire_database__WEBPACK_IMPORTED_MODULE_2__["AngularFireDatabase"] }
];
AuthService = __decorate([
    Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["Injectable"])({
        providedIn: 'root'
    }),
    __metadata("design:paramtypes", [_angular_fire_auth__WEBPACK_IMPORTED_MODULE_1__["AngularFireAuth"], _angular_fire_database__WEBPACK_IMPORTED_MODULE_2__["AngularFireDatabase"]])
], AuthService);



/***/ }),

/***/ "./src/app/shared/components/index.ts":
/*!********************************************!*\
  !*** ./src/app/shared/components/index.ts ***!
  \********************************************/
/*! exports provided: PageNotFoundComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _page_not_found_page_not_found_component__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./page-not-found/page-not-found.component */ "./src/app/shared/components/page-not-found/page-not-found.component.ts");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "PageNotFoundComponent", function() { return _page_not_found_page_not_found_component__WEBPACK_IMPORTED_MODULE_0__["PageNotFoundComponent"]; });

var __importDefault = (undefined && undefined.__importDefault) || function (mod) {
  return (mod && mod.__esModule) ? mod : { "default": mod };
};



/***/ }),

/***/ "./src/app/shared/components/page-not-found/page-not-found.component.scss":
/*!********************************************************************************!*\
  !*** ./src/app/shared/components/page-not-found/page-not-found.component.scss ***!
  \********************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony default export */ __webpack_exports__["default"] = ("\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IiIsImZpbGUiOiJzcmMvYXBwL3NoYXJlZC9jb21wb25lbnRzL3BhZ2Utbm90LWZvdW5kL3BhZ2Utbm90LWZvdW5kLmNvbXBvbmVudC5zY3NzIn0= */");

/***/ }),

/***/ "./src/app/shared/components/page-not-found/page-not-found.component.ts":
/*!******************************************************************************!*\
  !*** ./src/app/shared/components/page-not-found/page-not-found.component.ts ***!
  \******************************************************************************/
/*! exports provided: PageNotFoundComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "PageNotFoundComponent", function() { return PageNotFoundComponent; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/__ivy_ngcc__/fesm2015/core.js");
var __decorate = (undefined && undefined.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (undefined && undefined.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __importDefault = (undefined && undefined.__importDefault) || function (mod) {
  return (mod && mod.__esModule) ? mod : { "default": mod };
};

let PageNotFoundComponent = class PageNotFoundComponent {
    constructor() { }
    ngOnInit() { }
};
PageNotFoundComponent = __decorate([
    Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["Component"])({
        selector: 'app-page-not-found',
        template: __importDefault(__webpack_require__(/*! raw-loader!./page-not-found.component.html */ "./node_modules/raw-loader/dist/cjs.js!./src/app/shared/components/page-not-found/page-not-found.component.html")).default,
        styles: [__importDefault(__webpack_require__(/*! ./page-not-found.component.scss */ "./src/app/shared/components/page-not-found/page-not-found.component.scss")).default]
    }),
    __metadata("design:paramtypes", [])
], PageNotFoundComponent);



/***/ }),

/***/ "./src/app/shared/directives/index.ts":
/*!********************************************!*\
  !*** ./src/app/shared/directives/index.ts ***!
  \********************************************/
/*! exports provided: WebviewDirective */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _webview_webview_directive__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./webview/webview.directive */ "./src/app/shared/directives/webview/webview.directive.ts");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "WebviewDirective", function() { return _webview_webview_directive__WEBPACK_IMPORTED_MODULE_0__["WebviewDirective"]; });

var __importDefault = (undefined && undefined.__importDefault) || function (mod) {
  return (mod && mod.__esModule) ? mod : { "default": mod };
};



/***/ }),

/***/ "./src/app/shared/directives/webview/webview.directive.ts":
/*!****************************************************************!*\
  !*** ./src/app/shared/directives/webview/webview.directive.ts ***!
  \****************************************************************/
/*! exports provided: WebviewDirective */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "WebviewDirective", function() { return WebviewDirective; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/__ivy_ngcc__/fesm2015/core.js");
var __decorate = (undefined && undefined.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (undefined && undefined.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __importDefault = (undefined && undefined.__importDefault) || function (mod) {
  return (mod && mod.__esModule) ? mod : { "default": mod };
};

let WebviewDirective = class WebviewDirective {
    constructor() { }
};
WebviewDirective = __decorate([
    Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["Directive"])({
        selector: 'webview'
    }),
    __metadata("design:paramtypes", [])
], WebviewDirective);



/***/ }),

/***/ "./src/app/shared/models/user.ts":
/*!***************************************!*\
  !*** ./src/app/shared/models/user.ts ***!
  \***************************************/
/*! exports provided: User */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "User", function() { return User; });
var __importDefault = (undefined && undefined.__importDefault) || function (mod) {
  return (mod && mod.__esModule) ? mod : { "default": mod };
};
class User {
}


/***/ }),

/***/ "./src/app/shared/shared.module.ts":
/*!*****************************************!*\
  !*** ./src/app/shared/shared.module.ts ***!
  \*****************************************/
/*! exports provided: SharedModule */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "SharedModule", function() { return SharedModule; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/__ivy_ngcc__/fesm2015/core.js");
/* harmony import */ var _angular_common__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/common */ "./node_modules/@angular/common/__ivy_ngcc__/fesm2015/common.js");
/* harmony import */ var _ngx_translate_core__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @ngx-translate/core */ "./node_modules/@ngx-translate/core/__ivy_ngcc__/fesm2015/ngx-translate-core.js");
/* harmony import */ var _components___WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./components/ */ "./src/app/shared/components/index.ts");
/* harmony import */ var _directives___WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./directives/ */ "./src/app/shared/directives/index.ts");
/* harmony import */ var _angular_forms__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! @angular/forms */ "./node_modules/@angular/forms/__ivy_ngcc__/fesm2015/forms.js");
var __decorate = (undefined && undefined.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __importDefault = (undefined && undefined.__importDefault) || function (mod) {
  return (mod && mod.__esModule) ? mod : { "default": mod };
};






let SharedModule = class SharedModule {
};
SharedModule = __decorate([
    Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["NgModule"])({
        declarations: [_components___WEBPACK_IMPORTED_MODULE_3__["PageNotFoundComponent"], _directives___WEBPACK_IMPORTED_MODULE_4__["WebviewDirective"]],
        imports: [_angular_common__WEBPACK_IMPORTED_MODULE_1__["CommonModule"], _ngx_translate_core__WEBPACK_IMPORTED_MODULE_2__["TranslateModule"], _angular_forms__WEBPACK_IMPORTED_MODULE_5__["FormsModule"]],
        exports: [_ngx_translate_core__WEBPACK_IMPORTED_MODULE_2__["TranslateModule"], _directives___WEBPACK_IMPORTED_MODULE_4__["WebviewDirective"], _angular_forms__WEBPACK_IMPORTED_MODULE_5__["FormsModule"]]
    })
], SharedModule);



/***/ }),

/***/ "./src/app/sign-up-sheet/add-user-to-event/add-user-to-event.component.scss":
/*!**********************************************************************************!*\
  !*** ./src/app/sign-up-sheet/add-user-to-event/add-user-to-event.component.scss ***!
  \**********************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony default export */ __webpack_exports__["default"] = ("::ng-deep .my-class .modal-dialog {\n  max-width: 70% !important;\n  width: 70% !important;\n}\n\n.modal-header {\n  background-color: #5fce99;\n  color: white;\n}\n\n.modal-body {\n  padding: 1rem 2rem 0 2rem;\n  padding-bottom: 2rem;\n}\n\n.form {\n  padding-bottom: 1rem;\n}\n\n.form-section {\n  margin-bottom: 1.5rem;\n  color: darkgrey;\n  margin-top: 1.5rem;\n}\n\n.search-volunteer {\n  width: 75%;\n  margin: auto;\n  padding-top: 1rem;\n}\n\n.table-volunteers {\n  height: 250px;\n  overflow: auto;\n  width: 100%;\n}\n\n.footer {\n  padding-bottom: 2.5rem;\n  text-align: center;\n}\n\n.mat-table {\n  width: 90% !important;\n  margin: auto;\n}\n\n.mat-header-row {\n  width: 100%;\n}\n\n.mat-row {\n  width: 100%;\n}\n\n.mat-column-first_name {\n  flex: 0 0 25% !important;\n  min-width: 104px !important;\n}\n\n.mat-column-last_name {\n  flex: 0 0 25% !important;\n  min-width: 104px !important;\n}\n\n.mat-column-email {\n  flex: 0 0 50% !important;\n  min-width: 104px !important;\n}\n\n.mat-row.ng-star-inserted.active {\n  background-color: #5fce99;\n}\n\n.mat-row.ng-star-inserted.active > .mat-cell {\n  color: white;\n}\n\nbody > ngb-modal-window > div > div > div.footer > button {\n  color: #5fce99;\n  border-color: #5fce99;\n}\n\n.btn-add-volunteer {\n  color: #5fce99 !important;\n  border-color: #5fce99 !important;\n}\n\n.btn-add-volunteer:hover {\n  background-color: #5fce99 !important;\n  color: white !important;\n}\n\n.fa {\n  padding-right: 0.5rem;\n}\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi9Vc2Vycy9iZW5qYW1pbmVtaWxpYW5pL1NhbnRyb3BvbHJvdWxhbnQvYW5ndWxhci1lbGVjdHJvbi9zcmMvYXBwL3NpZ24tdXAtc2hlZXQvYWRkLXVzZXItdG8tZXZlbnQvYWRkLXVzZXItdG8tZXZlbnQuY29tcG9uZW50LnNjc3MiLCJzcmMvYXBwL3NpZ24tdXAtc2hlZXQvYWRkLXVzZXItdG8tZXZlbnQvYWRkLXVzZXItdG8tZXZlbnQuY29tcG9uZW50LnNjc3MiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUE7RUFDQyx5QkFBQTtFQUNBLHFCQUFBO0FDQ0Q7O0FERUE7RUFDQyx5QkFBQTtFQUNBLFlBQUE7QUNDRDs7QURFQTtFQUNDLHlCQUFBO0VBQ0Esb0JBQUE7QUNDRDs7QURFQTtFQUNDLG9CQUFBO0FDQ0Q7O0FERUE7RUFDQyxxQkFBQTtFQUNBLGVBQUE7RUFDQSxrQkFBQTtBQ0NEOztBREVBO0VBQ0MsVUFBQTtFQUNBLFlBQUE7RUFDQSxpQkFBQTtBQ0NEOztBREVBO0VBQ0MsYUFBQTtFQUNBLGNBQUE7RUFDQSxXQUFBO0FDQ0Q7O0FERUE7RUFDQyxzQkFBQTtFQUNBLGtCQUFBO0FDQ0Q7O0FERUE7RUFDQyxxQkFBQTtFQUNBLFlBQUE7QUNDRDs7QURFQTtFQUNDLFdBQUE7QUNDRDs7QURFQTtFQUNDLFdBQUE7QUNDRDs7QURFQTtFQUNDLHdCQUFBO0VBQ0EsMkJBQUE7QUNDRDs7QURFQTtFQUNDLHdCQUFBO0VBQ0EsMkJBQUE7QUNDRDs7QURFQTtFQUNDLHdCQUFBO0VBQ0EsMkJBQUE7QUNDRDs7QURFQTtFQUNDLHlCQUFBO0FDQ0Q7O0FERUE7RUFDQyxZQUFBO0FDQ0Q7O0FERUE7RUFDQyxjQUFBO0VBQ0EscUJBQUE7QUNDRDs7QURFQTtFQUNDLHlCQUFBO0VBQ0EsZ0NBQUE7QUNDRDs7QURFQTtFQUNDLG9DQUFBO0VBQ0EsdUJBQUE7QUNDRDs7QURFQTtFQUNDLHFCQUFBO0FDQ0QiLCJmaWxlIjoic3JjL2FwcC9zaWduLXVwLXNoZWV0L2FkZC11c2VyLXRvLWV2ZW50L2FkZC11c2VyLXRvLWV2ZW50LmNvbXBvbmVudC5zY3NzIiwic291cmNlc0NvbnRlbnQiOlsiOjpuZy1kZWVwIC5teS1jbGFzcyAubW9kYWwtZGlhbG9nIHtcblx0bWF4LXdpZHRoOiA3MCUgIWltcG9ydGFudDtcblx0d2lkdGg6IDcwJSAhaW1wb3J0YW50O1xufVxuXG4ubW9kYWwtaGVhZGVyIHtcblx0YmFja2dyb3VuZC1jb2xvcjogIzVmY2U5OTtcblx0Y29sb3I6IHdoaXRlO1xufVxuXG4ubW9kYWwtYm9keSB7XG5cdHBhZGRpbmc6IDFyZW0gMnJlbSAwIDJyZW07XG5cdHBhZGRpbmctYm90dG9tOiAycmVtO1xufVxuXG4uZm9ybSB7XG5cdHBhZGRpbmctYm90dG9tOiAxcmVtO1xufVxuXG4uZm9ybS1zZWN0aW9uIHtcblx0bWFyZ2luLWJvdHRvbTogMS41cmVtO1xuXHRjb2xvcjogZGFya2dyZXk7XG5cdG1hcmdpbi10b3A6IDEuNXJlbTtcbn1cblxuLnNlYXJjaC12b2x1bnRlZXIge1xuXHR3aWR0aDogNzUlO1xuXHRtYXJnaW46IGF1dG87XG5cdHBhZGRpbmctdG9wOiAxcmVtO1xufVxuXG4udGFibGUtdm9sdW50ZWVycyB7XG5cdGhlaWdodDogMjUwcHg7XG5cdG92ZXJmbG93OiBhdXRvO1xuXHR3aWR0aDogMTAwJTtcbn1cblxuLmZvb3RlciB7XG5cdHBhZGRpbmctYm90dG9tOiAyLjVyZW07XG5cdHRleHQtYWxpZ246IGNlbnRlcjtcbn1cblxuLm1hdC10YWJsZSB7XG5cdHdpZHRoOiA5MCUgIWltcG9ydGFudDtcblx0bWFyZ2luOiBhdXRvO1xufVxuXG4ubWF0LWhlYWRlci1yb3cge1xuXHR3aWR0aDogMTAwJTtcbn1cblxuLm1hdC1yb3cge1xuXHR3aWR0aDogMTAwJTtcbn1cblxuLm1hdC1jb2x1bW4tZmlyc3RfbmFtZSB7XG5cdGZsZXg6IDAgMCAyNSUgIWltcG9ydGFudDtcblx0bWluLXdpZHRoOiAxMDRweCAhaW1wb3J0YW50O1xufVxuXG4ubWF0LWNvbHVtbi1sYXN0X25hbWUge1xuXHRmbGV4OiAwIDAgMjUlICFpbXBvcnRhbnQ7XG5cdG1pbi13aWR0aDogMTA0cHggIWltcG9ydGFudDtcbn1cblxuLm1hdC1jb2x1bW4tZW1haWwge1xuXHRmbGV4OiAwIDAgNTAlICFpbXBvcnRhbnQ7XG5cdG1pbi13aWR0aDogMTA0cHggIWltcG9ydGFudDtcbn1cblxuLm1hdC1yb3cubmctc3Rhci1pbnNlcnRlZC5hY3RpdmUge1xuXHRiYWNrZ3JvdW5kLWNvbG9yOiAjNWZjZTk5O1xufVxuXG4ubWF0LXJvdy5uZy1zdGFyLWluc2VydGVkLmFjdGl2ZT4ubWF0LWNlbGwge1xuXHRjb2xvcjogd2hpdGU7XG59XG5cbmJvZHk+bmdiLW1vZGFsLXdpbmRvdz5kaXY+ZGl2PmRpdi5mb290ZXI+YnV0dG9uIHtcblx0Y29sb3I6ICM1ZmNlOTk7XG5cdGJvcmRlci1jb2xvcjogIzVmY2U5OTtcbn1cblxuLmJ0bi1hZGQtdm9sdW50ZWVyIHtcblx0Y29sb3I6ICM1ZmNlOTkgIWltcG9ydGFudDtcblx0Ym9yZGVyLWNvbG9yOiAjNWZjZTk5ICFpbXBvcnRhbnQ7XG59XG5cbi5idG4tYWRkLXZvbHVudGVlcjpob3ZlciB7XG5cdGJhY2tncm91bmQtY29sb3I6ICM1ZmNlOTkgIWltcG9ydGFudDtcblx0Y29sb3I6IHdoaXRlICFpbXBvcnRhbnQ7XG59XG5cbi5mYSB7XG5cdHBhZGRpbmctcmlnaHQ6IDAuNXJlbTtcbn1cbiIsIjo6bmctZGVlcCAubXktY2xhc3MgLm1vZGFsLWRpYWxvZyB7XG4gIG1heC13aWR0aDogNzAlICFpbXBvcnRhbnQ7XG4gIHdpZHRoOiA3MCUgIWltcG9ydGFudDtcbn1cblxuLm1vZGFsLWhlYWRlciB7XG4gIGJhY2tncm91bmQtY29sb3I6ICM1ZmNlOTk7XG4gIGNvbG9yOiB3aGl0ZTtcbn1cblxuLm1vZGFsLWJvZHkge1xuICBwYWRkaW5nOiAxcmVtIDJyZW0gMCAycmVtO1xuICBwYWRkaW5nLWJvdHRvbTogMnJlbTtcbn1cblxuLmZvcm0ge1xuICBwYWRkaW5nLWJvdHRvbTogMXJlbTtcbn1cblxuLmZvcm0tc2VjdGlvbiB7XG4gIG1hcmdpbi1ib3R0b206IDEuNXJlbTtcbiAgY29sb3I6IGRhcmtncmV5O1xuICBtYXJnaW4tdG9wOiAxLjVyZW07XG59XG5cbi5zZWFyY2gtdm9sdW50ZWVyIHtcbiAgd2lkdGg6IDc1JTtcbiAgbWFyZ2luOiBhdXRvO1xuICBwYWRkaW5nLXRvcDogMXJlbTtcbn1cblxuLnRhYmxlLXZvbHVudGVlcnMge1xuICBoZWlnaHQ6IDI1MHB4O1xuICBvdmVyZmxvdzogYXV0bztcbiAgd2lkdGg6IDEwMCU7XG59XG5cbi5mb290ZXIge1xuICBwYWRkaW5nLWJvdHRvbTogMi41cmVtO1xuICB0ZXh0LWFsaWduOiBjZW50ZXI7XG59XG5cbi5tYXQtdGFibGUge1xuICB3aWR0aDogOTAlICFpbXBvcnRhbnQ7XG4gIG1hcmdpbjogYXV0bztcbn1cblxuLm1hdC1oZWFkZXItcm93IHtcbiAgd2lkdGg6IDEwMCU7XG59XG5cbi5tYXQtcm93IHtcbiAgd2lkdGg6IDEwMCU7XG59XG5cbi5tYXQtY29sdW1uLWZpcnN0X25hbWUge1xuICBmbGV4OiAwIDAgMjUlICFpbXBvcnRhbnQ7XG4gIG1pbi13aWR0aDogMTA0cHggIWltcG9ydGFudDtcbn1cblxuLm1hdC1jb2x1bW4tbGFzdF9uYW1lIHtcbiAgZmxleDogMCAwIDI1JSAhaW1wb3J0YW50O1xuICBtaW4td2lkdGg6IDEwNHB4ICFpbXBvcnRhbnQ7XG59XG5cbi5tYXQtY29sdW1uLWVtYWlsIHtcbiAgZmxleDogMCAwIDUwJSAhaW1wb3J0YW50O1xuICBtaW4td2lkdGg6IDEwNHB4ICFpbXBvcnRhbnQ7XG59XG5cbi5tYXQtcm93Lm5nLXN0YXItaW5zZXJ0ZWQuYWN0aXZlIHtcbiAgYmFja2dyb3VuZC1jb2xvcjogIzVmY2U5OTtcbn1cblxuLm1hdC1yb3cubmctc3Rhci1pbnNlcnRlZC5hY3RpdmUgPiAubWF0LWNlbGwge1xuICBjb2xvcjogd2hpdGU7XG59XG5cbmJvZHkgPiBuZ2ItbW9kYWwtd2luZG93ID4gZGl2ID4gZGl2ID4gZGl2LmZvb3RlciA+IGJ1dHRvbiB7XG4gIGNvbG9yOiAjNWZjZTk5O1xuICBib3JkZXItY29sb3I6ICM1ZmNlOTk7XG59XG5cbi5idG4tYWRkLXZvbHVudGVlciB7XG4gIGNvbG9yOiAjNWZjZTk5ICFpbXBvcnRhbnQ7XG4gIGJvcmRlci1jb2xvcjogIzVmY2U5OSAhaW1wb3J0YW50O1xufVxuXG4uYnRuLWFkZC12b2x1bnRlZXI6aG92ZXIge1xuICBiYWNrZ3JvdW5kLWNvbG9yOiAjNWZjZTk5ICFpbXBvcnRhbnQ7XG4gIGNvbG9yOiB3aGl0ZSAhaW1wb3J0YW50O1xufVxuXG4uZmEge1xuICBwYWRkaW5nLXJpZ2h0OiAwLjVyZW07XG59Il19 */");

/***/ }),

/***/ "./src/app/sign-up-sheet/add-user-to-event/add-user-to-event.component.ts":
/*!********************************************************************************!*\
  !*** ./src/app/sign-up-sheet/add-user-to-event/add-user-to-event.component.ts ***!
  \********************************************************************************/
/*! exports provided: AddUserToEventComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "AddUserToEventComponent", function() { return AddUserToEventComponent; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/__ivy_ngcc__/fesm2015/core.js");
/* harmony import */ var _ng_bootstrap_ng_bootstrap__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @ng-bootstrap/ng-bootstrap */ "./node_modules/@ng-bootstrap/ng-bootstrap/__ivy_ngcc__/fesm2015/ng-bootstrap.js");
/* harmony import */ var _angular_material_table__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/material/table */ "./node_modules/@angular/material/__ivy_ngcc__/fesm2015/table.js");
/* harmony import */ var _core_services_modalService__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../../core/services/modalService */ "./src/app/core/services/modalService.ts");
/* harmony import */ var _firebase_service_service__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../../firebase-service.service */ "./src/app/firebase-service.service.ts");
var __decorate = (undefined && undefined.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (undefined && undefined.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __importDefault = (undefined && undefined.__importDefault) || function (mod) {
  return (mod && mod.__esModule) ? mod : { "default": mod };
};





let AddUserToEventComponent = class AddUserToEventComponent {
    constructor(fs, modalService, myModalService) {
        this.fs = fs;
        this.modalService = modalService;
        this.myModalService = myModalService;
        this.displayedColumns = ['first_name', 'last_name', 'email'];
        this.selectedRow = {};
    }
    ngOnInit() { this.myModalService.set(this); }
    open(event_id, eventType, date, volunteerList) {
        this.eventType = eventType;
        this.date = date;
        this.event_id = event_id;
        this.dataSource = new _angular_material_table__WEBPACK_IMPORTED_MODULE_2__["MatTableDataSource"](volunteerList);
        this.modalReference = this.modalService.open(this.modalTemplate, { ariaLabelledBy: 'modal-basic-title',
            size: 'lg',
            windowClass: 'my-class',
            centered: true
        });
    }
    applyFilter(filterValue) {
        this.dataSource.filter = filterValue.trim().toLowerCase();
    }
    setClickedRow(index, row) {
        this.selectedRowIndex = index;
        this.selectedRow = row;
    }
    onSubmit() {
        if (this.selectedRowIndex >= 0) {
            this.modalReference.close();
            this.fs.addUserToEvent(this.event_id, this.selectedRow.first_name, this.selectedRow.last_name, this.selectedRow.id);
            this.selectedRowIndex = -1;
            this.selectedRow = {};
        }
    }
};
AddUserToEventComponent.ctorParameters = () => [
    { type: _firebase_service_service__WEBPACK_IMPORTED_MODULE_4__["FirebaseService"] },
    { type: _ng_bootstrap_ng_bootstrap__WEBPACK_IMPORTED_MODULE_1__["NgbModal"] },
    { type: _core_services_modalService__WEBPACK_IMPORTED_MODULE_3__["ModalService"] }
];
__decorate([
    Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["ViewChild"])('addUserModal', { static: true }),
    __metadata("design:type", _angular_core__WEBPACK_IMPORTED_MODULE_0__["TemplateRef"])
], AddUserToEventComponent.prototype, "modalTemplate", void 0);
AddUserToEventComponent = __decorate([
    Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["Component"])({
        selector: 'app-add-user-to-event',
        template: __importDefault(__webpack_require__(/*! raw-loader!./add-user-to-event.component.html */ "./node_modules/raw-loader/dist/cjs.js!./src/app/sign-up-sheet/add-user-to-event/add-user-to-event.component.html")).default,
        styles: [__importDefault(__webpack_require__(/*! ./add-user-to-event.component.scss */ "./src/app/sign-up-sheet/add-user-to-event/add-user-to-event.component.scss")).default]
    }),
    __metadata("design:paramtypes", [_firebase_service_service__WEBPACK_IMPORTED_MODULE_4__["FirebaseService"],
        _ng_bootstrap_ng_bootstrap__WEBPACK_IMPORTED_MODULE_1__["NgbModal"],
        _core_services_modalService__WEBPACK_IMPORTED_MODULE_3__["ModalService"]])
], AddUserToEventComponent);



/***/ }),

/***/ "./src/app/sign-up-sheet/event-note/event-note.component.scss":
/*!********************************************************************!*\
  !*** ./src/app/sign-up-sheet/event-note/event-note.component.scss ***!
  \********************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony default export */ __webpack_exports__["default"] = ("::ng-deep .staff-note .modal-dialog {\n  max-width: 40%;\n  width: 40%;\n}\n\n.modal-header {\n  background-color: #5fce99;\n}\n\n.modal-title {\n  color: white;\n}\n\n.modal-body {\n  padding: 1rem 4rem 1rem 4rem;\n}\n\n.footer {\n  padding-top: 1rem;\n  padding-bottom: 2.5rem;\n  text-align: center;\n}\n\n.btn-insert-staff-note {\n  background-color: #5fce99 !important;\n  color: white !important;\n  border-color: #5fce99 !important;\n}\n\n.btn-insert-staff-note:hover {\n  background-color: #40c485 !important;\n  border-color: #40c485 !important;\n}\n\n.btn-cancel {\n  color: #5fce99 !important;\n  border-color: #5fce99 !important;\n  margin-right: 1rem;\n}\n\n.btn-cancel:hover {\n  background-color: #5fce99 !important;\n  color: white !important;\n}\n\n.desc {\n  margin-bottom: 1.5rem;\n}\n\n.note {\n  justify-content: center;\n}\n\n.mat-form-field {\n  width: 100%;\n}\n\np {\n  font-family: Lato;\n}\n\n[contenteditable] {\n  white-space: pre-wrap;\n  border: 1px solid black;\n  padding: 16px;\n  outline: 0;\n  overflow-y: auto;\n  line-height: 30px;\n  height: 200px;\n}\n\n[contenteditable]:focus {\n  border-color: blue;\n}\n\n.close:focus {\n  outline: none;\n}\n\n.event-note {\n  cursor: pointer;\n}\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi9Vc2Vycy9iZW5qYW1pbmVtaWxpYW5pL1NhbnRyb3BvbHJvdWxhbnQvYW5ndWxhci1lbGVjdHJvbi9zcmMvYXBwL3NpZ24tdXAtc2hlZXQvZXZlbnQtbm90ZS9ldmVudC1ub3RlLmNvbXBvbmVudC5zY3NzIiwic3JjL2FwcC9zaWduLXVwLXNoZWV0L2V2ZW50LW5vdGUvZXZlbnQtbm90ZS5jb21wb25lbnQuc2NzcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQTtFQUNLLGNBQUE7RUFDQSxVQUFBO0FDQ0w7O0FER0E7RUFDRSx5QkFBQTtBQ0FGOztBREdBO0VBQ0UsWUFBQTtBQ0FGOztBREdBO0VBQ0UsNEJBQUE7QUNBRjs7QURHQTtFQUNFLGlCQUFBO0VBQ0Esc0JBQUE7RUFDQSxrQkFBQTtBQ0FGOztBREdBO0VBQ0Usb0NBQUE7RUFDQSx1QkFBQTtFQUNBLGdDQUFBO0FDQUY7O0FER0E7RUFDRSxvQ0FBQTtFQUNBLGdDQUFBO0FDQUY7O0FER0E7RUFDRSx5QkFBQTtFQUNBLGdDQUFBO0VBQ0Esa0JBQUE7QUNBRjs7QURHQTtFQUNFLG9DQUFBO0VBQ0EsdUJBQUE7QUNBRjs7QURHQTtFQUNFLHFCQUFBO0FDQUY7O0FER0E7RUFDRSx1QkFBQTtBQ0FGOztBREdBO0VBQ0UsV0FBQTtBQ0FGOztBREdBO0VBQ0UsaUJBQUE7QUNBRjs7QURHQTtFQUNFLHFCQUFBO0VBQ0EsdUJBQUE7RUFDQSxhQUFBO0VBQ0EsVUFBQTtFQUNBLGdCQUFBO0VBQ0EsaUJBQUE7RUFDQSxhQUFBO0FDQUY7O0FER0E7RUFDRSxrQkFBQTtBQ0FGOztBREdBO0VBQ0UsYUFBQTtBQ0FGOztBREdBO0VBQ0UsZUFBQTtBQ0FGIiwiZmlsZSI6InNyYy9hcHAvc2lnbi11cC1zaGVldC9ldmVudC1ub3RlL2V2ZW50LW5vdGUuY29tcG9uZW50LnNjc3MiLCJzb3VyY2VzQ29udGVudCI6WyI6Om5nLWRlZXAgLnN0YWZmLW5vdGUgLm1vZGFsLWRpYWxvZyB7XG4gICAgIG1heC13aWR0aDogNDAlO1xuICAgICB3aWR0aDogNDAlO1xufVxuXG5cbi5tb2RhbC1oZWFkZXJ7XG4gIGJhY2tncm91bmQtY29sb3I6ICM1ZmNlOTk7XG59XG5cbi5tb2RhbC10aXRsZXtcbiAgY29sb3I6IHdoaXRlO1xufVxuXG4ubW9kYWwtYm9keSB7XG4gIHBhZGRpbmc6IDFyZW0gNHJlbSAxcmVtIDRyZW07XG59XG5cbi5mb290ZXIge1xuICBwYWRkaW5nLXRvcDogMXJlbTtcbiAgcGFkZGluZy1ib3R0b206IDIuNXJlbTtcbiAgdGV4dC1hbGlnbjogY2VudGVyO1xufVxuXG4uYnRuLWluc2VydC1zdGFmZi1ub3RlIHtcbiAgYmFja2dyb3VuZC1jb2xvcjogIzVmY2U5OSAhaW1wb3J0YW50O1xuICBjb2xvcjogd2hpdGUgIWltcG9ydGFudDtcbiAgYm9yZGVyLWNvbG9yOiAjNWZjZTk5ICFpbXBvcnRhbnQ7XG59XG5cbi5idG4taW5zZXJ0LXN0YWZmLW5vdGU6aG92ZXIge1xuICBiYWNrZ3JvdW5kLWNvbG9yOiAjNDBjNDg1ICFpbXBvcnRhbnQ7XG4gIGJvcmRlci1jb2xvcjogIzQwYzQ4NSAhaW1wb3J0YW50O1xufVxuXG4uYnRuLWNhbmNlbCB7XG4gIGNvbG9yOiM1ZmNlOTkgIWltcG9ydGFudDtcbiAgYm9yZGVyLWNvbG9yOiM1ZmNlOTkgIWltcG9ydGFudDtcbiAgbWFyZ2luLXJpZ2h0OjFyZW07XG59XG5cbi5idG4tY2FuY2VsOmhvdmVyIHtcbiAgYmFja2dyb3VuZC1jb2xvcjogIzVmY2U5OSAhaW1wb3J0YW50O1xuICBjb2xvcjogd2hpdGUgIWltcG9ydGFudDtcbn1cblxuLmRlc2Mge1xuICBtYXJnaW4tYm90dG9tOiAxLjVyZW07XG59XG5cbi5ub3RlIHtcbiAganVzdGlmeS1jb250ZW50OiBjZW50ZXI7XG59XG5cbi5tYXQtZm9ybS1maWVsZCB7XG4gIHdpZHRoOiAxMDAlO1xufVxuXG5wIHtcbiAgZm9udC1mYW1pbHk6IExhdG87XG59XG5cbltjb250ZW50ZWRpdGFibGVdIHtcbiAgd2hpdGUtc3BhY2U6IHByZS13cmFwO1xuICBib3JkZXI6IDFweCBzb2xpZCBibGFjaztcbiAgcGFkZGluZzogMTZweDtcbiAgb3V0bGluZTogMDtcbiAgb3ZlcmZsb3cteTphdXRvO1xuICBsaW5lLWhlaWdodDogMzBweDtcbiAgaGVpZ2h0OiAyMDBweDtcbn1cblxuW2NvbnRlbnRlZGl0YWJsZV06Zm9jdXMge1xuICBib3JkZXItY29sb3I6IGJsdWU7XG59XG5cbi5jbG9zZTpmb2N1cyB7XG4gIG91dGxpbmU6IG5vbmU7XG59XG5cbi5ldmVudC1ub3RlIHtcbiAgY3Vyc29yOiBwb2ludGVyO1xufVxuIiwiOjpuZy1kZWVwIC5zdGFmZi1ub3RlIC5tb2RhbC1kaWFsb2cge1xuICBtYXgtd2lkdGg6IDQwJTtcbiAgd2lkdGg6IDQwJTtcbn1cblxuLm1vZGFsLWhlYWRlciB7XG4gIGJhY2tncm91bmQtY29sb3I6ICM1ZmNlOTk7XG59XG5cbi5tb2RhbC10aXRsZSB7XG4gIGNvbG9yOiB3aGl0ZTtcbn1cblxuLm1vZGFsLWJvZHkge1xuICBwYWRkaW5nOiAxcmVtIDRyZW0gMXJlbSA0cmVtO1xufVxuXG4uZm9vdGVyIHtcbiAgcGFkZGluZy10b3A6IDFyZW07XG4gIHBhZGRpbmctYm90dG9tOiAyLjVyZW07XG4gIHRleHQtYWxpZ246IGNlbnRlcjtcbn1cblxuLmJ0bi1pbnNlcnQtc3RhZmYtbm90ZSB7XG4gIGJhY2tncm91bmQtY29sb3I6ICM1ZmNlOTkgIWltcG9ydGFudDtcbiAgY29sb3I6IHdoaXRlICFpbXBvcnRhbnQ7XG4gIGJvcmRlci1jb2xvcjogIzVmY2U5OSAhaW1wb3J0YW50O1xufVxuXG4uYnRuLWluc2VydC1zdGFmZi1ub3RlOmhvdmVyIHtcbiAgYmFja2dyb3VuZC1jb2xvcjogIzQwYzQ4NSAhaW1wb3J0YW50O1xuICBib3JkZXItY29sb3I6ICM0MGM0ODUgIWltcG9ydGFudDtcbn1cblxuLmJ0bi1jYW5jZWwge1xuICBjb2xvcjogIzVmY2U5OSAhaW1wb3J0YW50O1xuICBib3JkZXItY29sb3I6ICM1ZmNlOTkgIWltcG9ydGFudDtcbiAgbWFyZ2luLXJpZ2h0OiAxcmVtO1xufVxuXG4uYnRuLWNhbmNlbDpob3ZlciB7XG4gIGJhY2tncm91bmQtY29sb3I6ICM1ZmNlOTkgIWltcG9ydGFudDtcbiAgY29sb3I6IHdoaXRlICFpbXBvcnRhbnQ7XG59XG5cbi5kZXNjIHtcbiAgbWFyZ2luLWJvdHRvbTogMS41cmVtO1xufVxuXG4ubm90ZSB7XG4gIGp1c3RpZnktY29udGVudDogY2VudGVyO1xufVxuXG4ubWF0LWZvcm0tZmllbGQge1xuICB3aWR0aDogMTAwJTtcbn1cblxucCB7XG4gIGZvbnQtZmFtaWx5OiBMYXRvO1xufVxuXG5bY29udGVudGVkaXRhYmxlXSB7XG4gIHdoaXRlLXNwYWNlOiBwcmUtd3JhcDtcbiAgYm9yZGVyOiAxcHggc29saWQgYmxhY2s7XG4gIHBhZGRpbmc6IDE2cHg7XG4gIG91dGxpbmU6IDA7XG4gIG92ZXJmbG93LXk6IGF1dG87XG4gIGxpbmUtaGVpZ2h0OiAzMHB4O1xuICBoZWlnaHQ6IDIwMHB4O1xufVxuXG5bY29udGVudGVkaXRhYmxlXTpmb2N1cyB7XG4gIGJvcmRlci1jb2xvcjogYmx1ZTtcbn1cblxuLmNsb3NlOmZvY3VzIHtcbiAgb3V0bGluZTogbm9uZTtcbn1cblxuLmV2ZW50LW5vdGUge1xuICBjdXJzb3I6IHBvaW50ZXI7XG59Il19 */");

/***/ }),

/***/ "./src/app/sign-up-sheet/event-note/event-note.component.ts":
/*!******************************************************************!*\
  !*** ./src/app/sign-up-sheet/event-note/event-note.component.ts ***!
  \******************************************************************/
/*! exports provided: EventNoteComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "EventNoteComponent", function() { return EventNoteComponent; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/__ivy_ngcc__/fesm2015/core.js");
/* harmony import */ var _ng_bootstrap_ng_bootstrap__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @ng-bootstrap/ng-bootstrap */ "./node_modules/@ng-bootstrap/ng-bootstrap/__ivy_ngcc__/fesm2015/ng-bootstrap.js");
var __decorate = (undefined && undefined.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (undefined && undefined.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __importDefault = (undefined && undefined.__importDefault) || function (mod) {
  return (mod && mod.__esModule) ? mod : { "default": mod };
};


let EventNoteComponent = class EventNoteComponent {
    constructor(modalService) {
        this.modalService = modalService;
        this.updateEventNote = new _angular_core__WEBPACK_IMPORTED_MODULE_0__["EventEmitter"]();
        this.touched = false;
    }
    ngOnInit() {
        this.currentEventNote = this.eventNote ? this.eventNote : '';
    }
    open(content) {
        this.modalReference = this.modalService.open(content, { ariaLabelledBy: 'modal-basic-title',
            size: 'sm',
            windowClass: 'staff-note',
            centered: true });
    }
    onSubmit() {
        this.updateEventNote.emit(this.eventNote);
        this.modalReference.close();
        this.touched = false;
        this.currentEventNote = this.eventNote;
    }
    close() {
        this.touched = false;
        this.eventNote = this.currentEventNote;
    }
    touch() {
        this.touched = true;
    }
};
EventNoteComponent.ctorParameters = () => [
    { type: _ng_bootstrap_ng_bootstrap__WEBPACK_IMPORTED_MODULE_1__["NgbModal"] }
];
__decorate([
    Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["Input"])(),
    __metadata("design:type", String)
], EventNoteComponent.prototype, "eventType", void 0);
__decorate([
    Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["Input"])(),
    __metadata("design:type", String)
], EventNoteComponent.prototype, "date", void 0);
__decorate([
    Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["Input"])(),
    __metadata("design:type", String)
], EventNoteComponent.prototype, "eventNote", void 0);
__decorate([
    Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["Output"])(),
    __metadata("design:type", _angular_core__WEBPACK_IMPORTED_MODULE_0__["EventEmitter"])
], EventNoteComponent.prototype, "updateEventNote", void 0);
EventNoteComponent = __decorate([
    Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["Component"])({
        selector: 'app-event-note',
        template: __importDefault(__webpack_require__(/*! raw-loader!./event-note.component.html */ "./node_modules/raw-loader/dist/cjs.js!./src/app/sign-up-sheet/event-note/event-note.component.html")).default,
        styles: [__importDefault(__webpack_require__(/*! ./event-note.component.scss */ "./src/app/sign-up-sheet/event-note/event-note.component.scss")).default]
    }),
    __metadata("design:paramtypes", [_ng_bootstrap_ng_bootstrap__WEBPACK_IMPORTED_MODULE_1__["NgbModal"]])
], EventNoteComponent);



/***/ }),

/***/ "./src/app/sign-up-sheet/event-sign-up-table/event-sign-up-table.component.scss":
/*!**************************************************************************************!*\
  !*** ./src/app/sign-up-sheet/event-sign-up-table/event-sign-up-table.component.scss ***!
  \**************************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony default export */ __webpack_exports__["default"] = (".mat-table {\n  width: 100% !important;\n  margin: auto;\n}\n\napp-add-user-to-event {\n  cursor: pointer;\n  float: right;\n}\n\ntd.mat-cell:last-of-type, td.mat-footer-cell:last-of-type, th.mat-header-cell:last-of-type {\n  padding-right: 5px;\n}\n\n.menu:focus {\n  outline: none;\n}\n\n.table-row[isEmpty=true]:hover {\n  background-color: #dfe0df;\n  cursor: pointer;\n}\n\n#noteBtn {\n  width: 1px;\n  height: 1px;\n  z-index: -10px;\n  position: fixed;\n  margin-top: -35px;\n  margin-left: -7px;\n  opacity: 1%;\n  border: 2px;\n}\n\n.menu:hover {\n  background-color: lightgrey;\n}\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi9Vc2Vycy9iZW5qYW1pbmVtaWxpYW5pL1NhbnRyb3BvbHJvdWxhbnQvYW5ndWxhci1lbGVjdHJvbi9zcmMvYXBwL3NpZ24tdXAtc2hlZXQvZXZlbnQtc2lnbi11cC10YWJsZS9ldmVudC1zaWduLXVwLXRhYmxlLmNvbXBvbmVudC5zY3NzIiwic3JjL2FwcC9zaWduLXVwLXNoZWV0L2V2ZW50LXNpZ24tdXAtdGFibGUvZXZlbnQtc2lnbi11cC10YWJsZS5jb21wb25lbnQuc2NzcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQTtFQUNJLHNCQUFBO0VBQ0EsWUFBQTtBQ0NKOztBREVBO0VBQ0ksZUFBQTtFQUNBLFlBQUE7QUNDSjs7QURFQTtFQUNFLGtCQUFBO0FDQ0Y7O0FERUE7RUFDQyxhQUFBO0FDQ0Q7O0FERUE7RUFDRSx5QkFBQTtFQUNBLGVBQUE7QUNDRjs7QURFQTtFQUNFLFVBQUE7RUFDQSxXQUFBO0VBQ0EsY0FBQTtFQUNBLGVBQUE7RUFDQSxpQkFBQTtFQUNBLGlCQUFBO0VBQ0EsV0FBQTtFQUNBLFdBQUE7QUNDRjs7QURFQTtFQUNFLDJCQUFBO0FDQ0YiLCJmaWxlIjoic3JjL2FwcC9zaWduLXVwLXNoZWV0L2V2ZW50LXNpZ24tdXAtdGFibGUvZXZlbnQtc2lnbi11cC10YWJsZS5jb21wb25lbnQuc2NzcyIsInNvdXJjZXNDb250ZW50IjpbIi5tYXQtdGFibGUge1xuICAgIHdpZHRoOiAxMDAlICFpbXBvcnRhbnQ7XG4gICAgbWFyZ2luOiBhdXRvO1xufVxuXG5hcHAtYWRkLXVzZXItdG8tZXZlbnQge1xuICAgIGN1cnNvcjogcG9pbnRlcjtcbiAgICBmbG9hdDogcmlnaHQ7XG59XG5cbnRkLm1hdC1jZWxsOmxhc3Qtb2YtdHlwZSwgdGQubWF0LWZvb3Rlci1jZWxsOmxhc3Qtb2YtdHlwZSwgdGgubWF0LWhlYWRlci1jZWxsOmxhc3Qtb2YtdHlwZSB7XG4gIHBhZGRpbmctcmlnaHQ6IDVweDtcbn1cblxuLm1lbnU6Zm9jdXMge1xuXHRvdXRsaW5lOiBub25lO1xufVxuXG4udGFibGUtcm93W2lzRW1wdHk9J3RydWUnXTpob3ZlciB7XG4gIGJhY2tncm91bmQtY29sb3I6I2RmZTBkZjtcbiAgY3Vyc29yOiBwb2ludGVyO1xufVxuXG4jbm90ZUJ0bntcbiAgd2lkdGg6IDFweDtcbiAgaGVpZ2h0OiAxcHg7XG4gIHotaW5kZXg6IC0xMHB4O1xuICBwb3NpdGlvbjogZml4ZWQ7XG4gIG1hcmdpbi10b3A6IC0zNXB4O1xuICBtYXJnaW4tbGVmdDogLTdweDtcbiAgb3BhY2l0eTogMSU7XG4gIGJvcmRlcjogMnB4O1xufVxuXG4ubWVudTpob3ZlcntcbiAgYmFja2dyb3VuZC1jb2xvcjogbGlnaHRncmV5O1xufVxuXG4iLCIubWF0LXRhYmxlIHtcbiAgd2lkdGg6IDEwMCUgIWltcG9ydGFudDtcbiAgbWFyZ2luOiBhdXRvO1xufVxuXG5hcHAtYWRkLXVzZXItdG8tZXZlbnQge1xuICBjdXJzb3I6IHBvaW50ZXI7XG4gIGZsb2F0OiByaWdodDtcbn1cblxudGQubWF0LWNlbGw6bGFzdC1vZi10eXBlLCB0ZC5tYXQtZm9vdGVyLWNlbGw6bGFzdC1vZi10eXBlLCB0aC5tYXQtaGVhZGVyLWNlbGw6bGFzdC1vZi10eXBlIHtcbiAgcGFkZGluZy1yaWdodDogNXB4O1xufVxuXG4ubWVudTpmb2N1cyB7XG4gIG91dGxpbmU6IG5vbmU7XG59XG5cbi50YWJsZS1yb3dbaXNFbXB0eT10cnVlXTpob3ZlciB7XG4gIGJhY2tncm91bmQtY29sb3I6ICNkZmUwZGY7XG4gIGN1cnNvcjogcG9pbnRlcjtcbn1cblxuI25vdGVCdG4ge1xuICB3aWR0aDogMXB4O1xuICBoZWlnaHQ6IDFweDtcbiAgei1pbmRleDogLTEwcHg7XG4gIHBvc2l0aW9uOiBmaXhlZDtcbiAgbWFyZ2luLXRvcDogLTM1cHg7XG4gIG1hcmdpbi1sZWZ0OiAtN3B4O1xuICBvcGFjaXR5OiAxJTtcbiAgYm9yZGVyOiAycHg7XG59XG5cbi5tZW51OmhvdmVyIHtcbiAgYmFja2dyb3VuZC1jb2xvcjogbGlnaHRncmV5O1xufSJdfQ== */");

/***/ }),

/***/ "./src/app/sign-up-sheet/event-sign-up-table/event-sign-up-table.component.ts":
/*!************************************************************************************!*\
  !*** ./src/app/sign-up-sheet/event-sign-up-table/event-sign-up-table.component.ts ***!
  \************************************************************************************/
/*! exports provided: EventSignUpTableComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "EventSignUpTableComponent", function() { return EventSignUpTableComponent; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/__ivy_ngcc__/fesm2015/core.js");
/* harmony import */ var _angular_material_table__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/material/table */ "./node_modules/@angular/material/__ivy_ngcc__/fesm2015/table.js");
/* harmony import */ var _core_services_modalService__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../core/services/modalService */ "./src/app/core/services/modalService.ts");
/* harmony import */ var _angular_fire_database__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @angular/fire/database */ "./node_modules/@angular/fire/__ivy_ngcc__/fesm2015/angular-fire-database.js");
/* harmony import */ var _firebase_service_service__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../../firebase-service.service */ "./src/app/firebase-service.service.ts");
var __decorate = (undefined && undefined.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (undefined && undefined.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __importDefault = (undefined && undefined.__importDefault) || function (mod) {
  return (mod && mod.__esModule) ? mod : { "default": mod };
};





let EventSignUpTableComponent = class EventSignUpTableComponent {
    constructor(modalService, db, fs) {
        this.modalService = modalService;
        this.db = db;
        this.fs = fs;
        this.displayedColumns = ['volunteer', 'actions'];
        this.removeUserFromEvent = new _angular_core__WEBPACK_IMPORTED_MODULE_0__["EventEmitter"]();
        this.insertStaffNote = new _angular_core__WEBPACK_IMPORTED_MODULE_0__["EventEmitter"]();
    }
    ngOnInit() {
        this.dataSource = new _angular_material_table__WEBPACK_IMPORTED_MODULE_1__["MatTableDataSource"](this.slots);
        this.fs.getUsers().subscribe(val => {
            this.volunteerList = val;
        });
    }
    prettySlot(slot) {
        return parseInt(slot, 10);
    }
    isEmpty(firstName, lastName, id) {
        if (id == 'N/A') {
            return false;
        }
        return !(firstName && lastName);
    }
    onRemoveUserFromEvent(id) {
        this.removeUserFromEvent.emit(id);
        // var a;
        // this.usersRef = this.db.list('user');
        // this.users= this.usersRef.snapshotChanges().pipe(
        //   map(changes => changes.map(c => ({ id: c.payload.key, ...c.payload.val() }))));
        // this.users.subscribe(snapshots => {
        //     snapshots.forEach(snapshot => {
        //       if(snapshot.id === id){
        //        a = snapshot.email;
        //        console.log("helllloooo");
        //        console.log(a);
        //       }
        //     });
        // });
    }
    onInsertStaffNote(eventId, staffNote) {
        this.insertStaffNote.emit({ 'event_id': eventId,
            'staff_note': staffNote });
    }
    openAddUserModal(row) {
        console.log(row);
        this.modalService.open(row.id, this.eventType, row.event_date_txt, this.volunteerList);
    }
};
EventSignUpTableComponent.ctorParameters = () => [
    { type: _core_services_modalService__WEBPACK_IMPORTED_MODULE_2__["ModalService"] },
    { type: _angular_fire_database__WEBPACK_IMPORTED_MODULE_3__["AngularFireDatabase"] },
    { type: _firebase_service_service__WEBPACK_IMPORTED_MODULE_4__["FirebaseService"] }
];
__decorate([
    Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["Input"])(),
    __metadata("design:type", Array)
], EventSignUpTableComponent.prototype, "slots", void 0);
__decorate([
    Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["Input"])(),
    __metadata("design:type", String)
], EventSignUpTableComponent.prototype, "eventType", void 0);
__decorate([
    Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["Input"])(),
    __metadata("design:type", String)
], EventSignUpTableComponent.prototype, "id", void 0);
__decorate([
    Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["Output"])(),
    __metadata("design:type", _angular_core__WEBPACK_IMPORTED_MODULE_0__["EventEmitter"])
], EventSignUpTableComponent.prototype, "removeUserFromEvent", void 0);
__decorate([
    Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["Output"])(),
    __metadata("design:type", _angular_core__WEBPACK_IMPORTED_MODULE_0__["EventEmitter"])
], EventSignUpTableComponent.prototype, "insertStaffNote", void 0);
EventSignUpTableComponent = __decorate([
    Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["Component"])({
        selector: 'app-event-sign-up-table',
        template: __importDefault(__webpack_require__(/*! raw-loader!./event-sign-up-table.component.html */ "./node_modules/raw-loader/dist/cjs.js!./src/app/sign-up-sheet/event-sign-up-table/event-sign-up-table.component.html")).default,
        styles: [__importDefault(__webpack_require__(/*! ./event-sign-up-table.component.scss */ "./src/app/sign-up-sheet/event-sign-up-table/event-sign-up-table.component.scss")).default]
    }),
    __metadata("design:paramtypes", [_core_services_modalService__WEBPACK_IMPORTED_MODULE_2__["ModalService"], _angular_fire_database__WEBPACK_IMPORTED_MODULE_3__["AngularFireDatabase"], _firebase_service_service__WEBPACK_IMPORTED_MODULE_4__["FirebaseService"]])
], EventSignUpTableComponent);



/***/ }),

/***/ "./src/app/sign-up-sheet/mark-permanent-event/mark-permanent-event.component.scss":
/*!****************************************************************************************!*\
  !*** ./src/app/sign-up-sheet/mark-permanent-event/mark-permanent-event.component.scss ***!
  \****************************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony default export */ __webpack_exports__["default"] = ("\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IiIsImZpbGUiOiJzcmMvYXBwL3NpZ24tdXAtc2hlZXQvbWFyay1wZXJtYW5lbnQtZXZlbnQvbWFyay1wZXJtYW5lbnQtZXZlbnQuY29tcG9uZW50LnNjc3MifQ== */");

/***/ }),

/***/ "./src/app/sign-up-sheet/mark-permanent-event/mark-permanent-event.component.ts":
/*!**************************************************************************************!*\
  !*** ./src/app/sign-up-sheet/mark-permanent-event/mark-permanent-event.component.ts ***!
  \**************************************************************************************/
/*! exports provided: MarkPermanentEventComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "MarkPermanentEventComponent", function() { return MarkPermanentEventComponent; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/__ivy_ngcc__/fesm2015/core.js");
/* harmony import */ var _ng_bootstrap_ng_bootstrap__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @ng-bootstrap/ng-bootstrap */ "./node_modules/@ng-bootstrap/ng-bootstrap/__ivy_ngcc__/fesm2015/ng-bootstrap.js");
var __decorate = (undefined && undefined.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (undefined && undefined.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __importDefault = (undefined && undefined.__importDefault) || function (mod) {
  return (mod && mod.__esModule) ? mod : { "default": mod };
};


let MarkPermanentEventComponent = class MarkPermanentEventComponent {
    constructor(modalService) {
        this.modalService = modalService;
        this.model = {};
    }
    ngOnInit() {
    }
    open(content) {
        this.modalReference = this.modalService.open(content, { ariaLabelledBy: 'modal-basic-title', size: 'sm', windowClass: 'my-class', centered: true });
    }
};
MarkPermanentEventComponent.ctorParameters = () => [
    { type: _ng_bootstrap_ng_bootstrap__WEBPACK_IMPORTED_MODULE_1__["NgbModal"] }
];
MarkPermanentEventComponent = __decorate([
    Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["Component"])({
        selector: 'app-mark-permanent-event',
        template: __importDefault(__webpack_require__(/*! raw-loader!./mark-permanent-event.component.html */ "./node_modules/raw-loader/dist/cjs.js!./src/app/sign-up-sheet/mark-permanent-event/mark-permanent-event.component.html")).default,
        styles: [__importDefault(__webpack_require__(/*! ./mark-permanent-event.component.scss */ "./src/app/sign-up-sheet/mark-permanent-event/mark-permanent-event.component.scss")).default]
    }),
    __metadata("design:paramtypes", [_ng_bootstrap_ng_bootstrap__WEBPACK_IMPORTED_MODULE_1__["NgbModal"]])
], MarkPermanentEventComponent);



/***/ }),

/***/ "./src/app/sign-up-sheet/new-schedule/new-schedule.component.css":
/*!***********************************************************************!*\
  !*** ./src/app/sign-up-sheet/new-schedule/new-schedule.component.css ***!
  \***********************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony default export */ __webpack_exports__["default"] = ("\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IiIsImZpbGUiOiJzcmMvYXBwL3NpZ24tdXAtc2hlZXQvbmV3LXNjaGVkdWxlL25ldy1zY2hlZHVsZS5jb21wb25lbnQuY3NzIn0= */");

/***/ }),

/***/ "./src/app/sign-up-sheet/new-schedule/new-schedule.component.ts":
/*!**********************************************************************!*\
  !*** ./src/app/sign-up-sheet/new-schedule/new-schedule.component.ts ***!
  \**********************************************************************/
/*! exports provided: NewScheduleComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "NewScheduleComponent", function() { return NewScheduleComponent; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/__ivy_ngcc__/fesm2015/core.js");
var __decorate = (undefined && undefined.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (undefined && undefined.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __importDefault = (undefined && undefined.__importDefault) || function (mod) {
  return (mod && mod.__esModule) ? mod : { "default": mod };
};

//import { User } from '../shared/models/user';
let NewScheduleComponent = class NewScheduleComponent {
    constructor() { }
    ngOnInit() {
    }
};
NewScheduleComponent = __decorate([
    Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["Component"])({
        selector: 'app-new-schedule',
        template: __importDefault(__webpack_require__(/*! raw-loader!./new-schedule.component.html */ "./node_modules/raw-loader/dist/cjs.js!./src/app/sign-up-sheet/new-schedule/new-schedule.component.html")).default,
        styles: [__importDefault(__webpack_require__(/*! ./new-schedule.component.css */ "./src/app/sign-up-sheet/new-schedule/new-schedule.component.css")).default]
    }),
    __metadata("design:paramtypes", [])
], NewScheduleComponent);



/***/ }),

/***/ "./src/app/sign-up-sheet/remove-user-from-event/remove-user-from-event.component.scss":
/*!********************************************************************************************!*\
  !*** ./src/app/sign-up-sheet/remove-user-from-event/remove-user-from-event.component.scss ***!
  \********************************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony default export */ __webpack_exports__["default"] = ("::ng-deep .remove-volunteer .modal-dialog {\n  max-width: 40%;\n  width: 40%;\n}\n\n.modal-header {\n  background-color: #dc3545;\n  color: white;\n}\n\n.modal-body {\n  padding: 1rem 2rem 0 2rem;\n  padding-top: 2rem;\n  padding-bottom: 2rem;\n}\n\n.img-warning {\n  margin-bottom: 1rem;\n  margin: auto;\n}\n\n.form {\n  padding-bottom: 0;\n}\n\n.form-section {\n  margin-bottom: 1.5rem;\n  color: darkgrey;\n  margin-top: 1.5rem;\n}\n\n.btn-cancel {\n  margin-right: 1rem;\n  border: blue;\n  color: blue;\n}\n\n.btn-remove-volunteer {\n  color: white;\n  background: #dc3545;\n}\n\n.close:focus {\n  outline: none;\n}\n\n.btn-remove-volunteer:hover {\n  background: #bb202f;\n}\n\n.footer {\n  padding-bottom: 2.5rem;\n  text-align: center;\n}\n\n[contenteditable] {\n  border: 1px solid black;\n  padding: 16px;\n  white-space: pre-wrap;\n  outline: 0;\n  line-height: 30px;\n  width: 83%;\n  height: 150px;\n  margin-left: 50px;\n  margin-bottom: 20px;\n  overflow-y: scroll;\n}\n\n[contenteditable]:focus {\n  border: 3px solid red;\n}\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi9Vc2Vycy9iZW5qYW1pbmVtaWxpYW5pL1NhbnRyb3BvbHJvdWxhbnQvYW5ndWxhci1lbGVjdHJvbi9zcmMvYXBwL3NpZ24tdXAtc2hlZXQvcmVtb3ZlLXVzZXItZnJvbS1ldmVudC9yZW1vdmUtdXNlci1mcm9tLWV2ZW50LmNvbXBvbmVudC5zY3NzIiwic3JjL2FwcC9zaWduLXVwLXNoZWV0L3JlbW92ZS11c2VyLWZyb20tZXZlbnQvcmVtb3ZlLXVzZXItZnJvbS1ldmVudC5jb21wb25lbnQuc2NzcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQTtFQUNLLGNBQUE7RUFDQSxVQUFBO0FDQ0w7O0FERUE7RUFDRSx5QkFBQTtFQUNBLFlBQUE7QUNDRjs7QURFQTtFQUNFLHlCQUFBO0VBQ0EsaUJBQUE7RUFDQSxvQkFBQTtBQ0NGOztBREVBO0VBQ0UsbUJBQUE7RUFDQSxZQUFBO0FDQ0Y7O0FERUE7RUFDRSxpQkFBQTtBQ0NGOztBREVBO0VBQ0UscUJBQUE7RUFDQSxlQUFBO0VBQ0Esa0JBQUE7QUNDRjs7QURFQTtFQUNFLGtCQUFBO0VBQ0EsWUFBQTtFQUNBLFdBQUE7QUNDRjs7QURFQTtFQUNFLFlBQUE7RUFDQSxtQkFBQTtBQ0NGOztBREVBO0VBQ0UsYUFBQTtBQ0NGOztBREVBO0VBQ0UsbUJBQUE7QUNDRjs7QURFQTtFQUNFLHNCQUFBO0VBQ0Esa0JBQUE7QUNDRjs7QURFQTtFQUNFLHVCQUFBO0VBQ0EsYUFBQTtFQUNBLHFCQUFBO0VBQ0EsVUFBQTtFQUNBLGlCQUFBO0VBQ0EsVUFBQTtFQUNBLGFBQUE7RUFDQSxpQkFBQTtFQUNBLG1CQUFBO0VBQ0Esa0JBQUE7QUNDRjs7QURJQTtFQUNFLHFCQUFBO0FDREYiLCJmaWxlIjoic3JjL2FwcC9zaWduLXVwLXNoZWV0L3JlbW92ZS11c2VyLWZyb20tZXZlbnQvcmVtb3ZlLXVzZXItZnJvbS1ldmVudC5jb21wb25lbnQuc2NzcyIsInNvdXJjZXNDb250ZW50IjpbIjo6bmctZGVlcCAucmVtb3ZlLXZvbHVudGVlciAubW9kYWwtZGlhbG9nIHtcbiAgICAgbWF4LXdpZHRoOiA0MCU7XG4gICAgIHdpZHRoOiA0MCU7XG59XG5cbi5tb2RhbC1oZWFkZXJ7XG4gIGJhY2tncm91bmQtY29sb3I6ICNkYzM1NDU7XG4gIGNvbG9yOiB3aGl0ZTtcbn1cblxuLm1vZGFsLWJvZHl7XG4gIHBhZGRpbmc6IDFyZW0gMnJlbSAwIDJyZW07XG4gIHBhZGRpbmctdG9wOjJyZW07XG4gIHBhZGRpbmctYm90dG9tOjJyZW07XG59XG5cbi5pbWctd2FybmluZyB7XG4gIG1hcmdpbi1ib3R0b206MXJlbTtcbiAgbWFyZ2luOmF1dG87XG59XG5cbi5mb3Jte1xuICBwYWRkaW5nLWJvdHRvbTogMDtcbn1cblxuLmZvcm0tc2VjdGlvbntcbiAgbWFyZ2luLWJvdHRvbTogMS41cmVtO1xuICBjb2xvcjogZGFya2dyZXk7XG4gIG1hcmdpbi10b3A6IDEuNXJlbTtcbn1cblxuLmJ0bi1jYW5jZWwge1xuICBtYXJnaW4tcmlnaHQ6MXJlbTtcbiAgYm9yZGVyOiBibHVlO1xuICBjb2xvcjpibHVlO1xufVxuXG4uYnRuLXJlbW92ZS12b2x1bnRlZXIge1xuICBjb2xvcjp3aGl0ZTtcbiAgYmFja2dyb3VuZDojZGMzNTQ1O1xufVxuXG4uY2xvc2U6Zm9jdXMge1xuICBvdXRsaW5lOiBub25lO1xufVxuXG4uYnRuLXJlbW92ZS12b2x1bnRlZXI6aG92ZXIge1xuICBiYWNrZ3JvdW5kOiAjYmIyMDJmO1xufVxuXG4uZm9vdGVye1xuICBwYWRkaW5nLWJvdHRvbTogMi41cmVtO1xuICB0ZXh0LWFsaWduOiBjZW50ZXI7XG59XG5cbltjb250ZW50ZWRpdGFibGVdIHtcbiAgYm9yZGVyOiAxcHggc29saWQgYmxhY2s7XG4gIHBhZGRpbmc6IDE2cHg7XG4gIHdoaXRlLXNwYWNlOiBwcmUtd3JhcDtcbiAgb3V0bGluZTogMDtcbiAgbGluZS1oZWlnaHQ6IDMwcHg7XG4gIHdpZHRoOiA4MyU7XG4gIGhlaWdodDogMTUwcHg7XG4gIG1hcmdpbi1sZWZ0OiA1MHB4O1xuICBtYXJnaW4tYm90dG9tOiAyMHB4O1xuICBvdmVyZmxvdy15OiBzY3JvbGw7XG5cbiAgXG59XG5cbltjb250ZW50ZWRpdGFibGVdOmZvY3VzIHtcbiAgYm9yZGVyOiAzcHggc29saWQgcmVkO1xuXG59IiwiOjpuZy1kZWVwIC5yZW1vdmUtdm9sdW50ZWVyIC5tb2RhbC1kaWFsb2cge1xuICBtYXgtd2lkdGg6IDQwJTtcbiAgd2lkdGg6IDQwJTtcbn1cblxuLm1vZGFsLWhlYWRlciB7XG4gIGJhY2tncm91bmQtY29sb3I6ICNkYzM1NDU7XG4gIGNvbG9yOiB3aGl0ZTtcbn1cblxuLm1vZGFsLWJvZHkge1xuICBwYWRkaW5nOiAxcmVtIDJyZW0gMCAycmVtO1xuICBwYWRkaW5nLXRvcDogMnJlbTtcbiAgcGFkZGluZy1ib3R0b206IDJyZW07XG59XG5cbi5pbWctd2FybmluZyB7XG4gIG1hcmdpbi1ib3R0b206IDFyZW07XG4gIG1hcmdpbjogYXV0bztcbn1cblxuLmZvcm0ge1xuICBwYWRkaW5nLWJvdHRvbTogMDtcbn1cblxuLmZvcm0tc2VjdGlvbiB7XG4gIG1hcmdpbi1ib3R0b206IDEuNXJlbTtcbiAgY29sb3I6IGRhcmtncmV5O1xuICBtYXJnaW4tdG9wOiAxLjVyZW07XG59XG5cbi5idG4tY2FuY2VsIHtcbiAgbWFyZ2luLXJpZ2h0OiAxcmVtO1xuICBib3JkZXI6IGJsdWU7XG4gIGNvbG9yOiBibHVlO1xufVxuXG4uYnRuLXJlbW92ZS12b2x1bnRlZXIge1xuICBjb2xvcjogd2hpdGU7XG4gIGJhY2tncm91bmQ6ICNkYzM1NDU7XG59XG5cbi5jbG9zZTpmb2N1cyB7XG4gIG91dGxpbmU6IG5vbmU7XG59XG5cbi5idG4tcmVtb3ZlLXZvbHVudGVlcjpob3ZlciB7XG4gIGJhY2tncm91bmQ6ICNiYjIwMmY7XG59XG5cbi5mb290ZXIge1xuICBwYWRkaW5nLWJvdHRvbTogMi41cmVtO1xuICB0ZXh0LWFsaWduOiBjZW50ZXI7XG59XG5cbltjb250ZW50ZWRpdGFibGVdIHtcbiAgYm9yZGVyOiAxcHggc29saWQgYmxhY2s7XG4gIHBhZGRpbmc6IDE2cHg7XG4gIHdoaXRlLXNwYWNlOiBwcmUtd3JhcDtcbiAgb3V0bGluZTogMDtcbiAgbGluZS1oZWlnaHQ6IDMwcHg7XG4gIHdpZHRoOiA4MyU7XG4gIGhlaWdodDogMTUwcHg7XG4gIG1hcmdpbi1sZWZ0OiA1MHB4O1xuICBtYXJnaW4tYm90dG9tOiAyMHB4O1xuICBvdmVyZmxvdy15OiBzY3JvbGw7XG59XG5cbltjb250ZW50ZWRpdGFibGVdOmZvY3VzIHtcbiAgYm9yZGVyOiAzcHggc29saWQgcmVkO1xufSJdfQ== */");

/***/ }),

/***/ "./src/app/sign-up-sheet/remove-user-from-event/remove-user-from-event.component.ts":
/*!******************************************************************************************!*\
  !*** ./src/app/sign-up-sheet/remove-user-from-event/remove-user-from-event.component.ts ***!
  \******************************************************************************************/
/*! exports provided: RemoveUserFromEventComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "RemoveUserFromEventComponent", function() { return RemoveUserFromEventComponent; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/__ivy_ngcc__/fesm2015/core.js");
/* harmony import */ var _firebase_service_service__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../firebase-service.service */ "./src/app/firebase-service.service.ts");
/* harmony import */ var _ng_bootstrap_ng_bootstrap__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @ng-bootstrap/ng-bootstrap */ "./node_modules/@ng-bootstrap/ng-bootstrap/__ivy_ngcc__/fesm2015/ng-bootstrap.js");
var __decorate = (undefined && undefined.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (undefined && undefined.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __importDefault = (undefined && undefined.__importDefault) || function (mod) {
  return (mod && mod.__esModule) ? mod : { "default": mod };
};



let RemoveUserFromEventComponent = class RemoveUserFromEventComponent {
    constructor(modalService, fs) {
        this.modalService = modalService;
        this.fs = fs;
        this.confirmRemove = new _angular_core__WEBPACK_IMPORTED_MODULE_0__["EventEmitter"]();
        this.model = {};
    }
    ngOnInit() { }
    open(content) {
        this.modalReference = this.modalService.open(content, { ariaLabelledBy: 'modal-basic-title',
            size: 'sm',
            windowClass: 'remove-volunteer',
            centered: true });
    }
    onSubmit() {
        this.fs.addCancellation(this.eventId, this.userId, this.cancellationNote);
        this.confirmRemove.emit('true');
        this.modalReference.close();
    }
};
RemoveUserFromEventComponent.ctorParameters = () => [
    { type: _ng_bootstrap_ng_bootstrap__WEBPACK_IMPORTED_MODULE_2__["NgbModal"] },
    { type: _firebase_service_service__WEBPACK_IMPORTED_MODULE_1__["FirebaseService"] }
];
__decorate([
    Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["Input"])(),
    __metadata("design:type", Object)
], RemoveUserFromEventComponent.prototype, "lastName", void 0);
__decorate([
    Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["Input"])(),
    __metadata("design:type", Object)
], RemoveUserFromEventComponent.prototype, "eventId", void 0);
__decorate([
    Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["Input"])(),
    __metadata("design:type", Object)
], RemoveUserFromEventComponent.prototype, "userId", void 0);
__decorate([
    Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["Input"])(),
    __metadata("design:type", Object)
], RemoveUserFromEventComponent.prototype, "cancellationNote", void 0);
__decorate([
    Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["Input"])(),
    __metadata("design:type", Object)
], RemoveUserFromEventComponent.prototype, "event", void 0);
__decorate([
    Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["Input"])(),
    __metadata("design:type", Object)
], RemoveUserFromEventComponent.prototype, "date", void 0);
__decorate([
    Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["Input"])(),
    __metadata("design:type", String)
], RemoveUserFromEventComponent.prototype, "firstName", void 0);
__decorate([
    Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["Input"])(),
    __metadata("design:type", Object)
], RemoveUserFromEventComponent.prototype, "eventType", void 0);
__decorate([
    Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["Output"])(),
    __metadata("design:type", _angular_core__WEBPACK_IMPORTED_MODULE_0__["EventEmitter"])
], RemoveUserFromEventComponent.prototype, "confirmRemove", void 0);
RemoveUserFromEventComponent = __decorate([
    Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["Component"])({
        selector: 'app-remove-user-from-event',
        template: __importDefault(__webpack_require__(/*! raw-loader!./remove-user-from-event.component.html */ "./node_modules/raw-loader/dist/cjs.js!./src/app/sign-up-sheet/remove-user-from-event/remove-user-from-event.component.html")).default,
        styles: [__importDefault(__webpack_require__(/*! ./remove-user-from-event.component.scss */ "./src/app/sign-up-sheet/remove-user-from-event/remove-user-from-event.component.scss")).default]
    }),
    __metadata("design:paramtypes", [_ng_bootstrap_ng_bootstrap__WEBPACK_IMPORTED_MODULE_2__["NgbModal"], _firebase_service_service__WEBPACK_IMPORTED_MODULE_1__["FirebaseService"]])
], RemoveUserFromEventComponent);



/***/ }),

/***/ "./src/app/sign-up-sheet/sign-up-sheet.component.scss":
/*!************************************************************!*\
  !*** ./src/app/sign-up-sheet/sign-up-sheet.component.scss ***!
  \************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony default export */ __webpack_exports__["default"] = (".page-title {\n  padding-top: 1rem;\n  padding-bottom: 0;\n}\n\n.page-title h1 {\n  padding: 0.5rem;\n  text-align: center;\n  color: #60a4ff;\n}\n\n.container-search {\n  display: flex;\n  justify-content: space-between;\n  align-items: center;\n}\n\n.volunteer-search {\n  margin-left: 2.5%;\n  margin-top: 1%;\n  width: 400px;\n}\n\n.mat-table {\n  overflow: auto;\n  max-height: 500px;\n  width: 95%;\n  margin-left: 2.5%;\n  margin-right: 2.5%;\n}\n\nth.mat-sort-header-sorted {\n  color: black;\n}\n\n.container {\n  max-width: none;\n  padding: 0;\n}\n\n.container .header {\n  background-color: #5fce99;\n  color: white;\n  padding-top: 0.5rem;\n  padding-bottom: 0.5rem;\n  width: inherit;\n  margin: 0;\n}\n\n.volunteer-name {\n  font-weight: bold;\n  font-size: 16;\n  margin-left: 1rem;\n}\n\n.actions {\n  position: absolute;\n  right: 5%;\n}\n\n.valign-center {\n  display: inline-flex;\n  vertical-align: middle;\n  align-items: center;\n}\n\n.body {\n  background-color: #c1ecd7;\n  padding: 1rem;\n}\n\n.valign-center mat-icon {\n  margin-right: 0.5rem;\n}\n\n.element-detail {\n  overflow: hidden;\n  display: flex;\n}\n\n.element-row {\n  position: relative;\n}\n\n.element-row:not(.expanded) {\n  cursor: pointer;\n}\n\n.element-row:not(.expanded):hover {\n  background: #f5f5f5;\n}\n\n.element-row.expanded {\n  border-bottom-color: transparent;\n}\n\ntr.detail-row {\n  height: 0;\n}\n\ntr.element-row:not(.expanded-row):hover {\n  background: #f5f5f5;\n}\n\ntr.element-row:not(.expanded-row):active {\n  background: #efefef;\n}\n\n.element-row td {\n  border-bottom-width: 0;\n}\n\n.card-header {\n  text-align: center;\n  color: white;\n  background-color: #60a4ff;\n}\n\n#cardTitle {\n  width: 12vw;\n  font-size: 0.9vw;\n}\n\n#cardTitle3 {\n  font-size: 0.96vw;\n}\n\n.card-body {\n  padding: 0;\n  width: 12vw;\n  font-size: 0.96vw;\n}\n\n.kitchenPM .card-body {\n  background-color: #f4abaa;\n}\n\n.row {\n  justify-content: center;\n}\n\n.img-important-event-false {\n  cursor: pointer;\n}\n\napp-permanent-volunteer {\n  float: right;\n  margin-right: 0.5rem;\n  margin-top: 0.2rem;\n  cursor: pointer;\n}\n\n.img-important-event-true {\n  cursor: pointer;\n}\n\n#logo {\n  margin-top: -30px;\n  margin-right: 20%;\n  max-width: 120px;\n  margin-left: -30%;\n  z-index: -1;\n}\n\nh1 {\n  display: inline;\n  text-align: center;\n}\n\nh3 {\n  margin-right: 15px;\n  margin-left: -3.1vw;\n  color: #99169d;\n  position: relative;\n  top: 50%;\n  font-size: 1.5vw !important;\n}\n\n.eventCardImportant {\n  border: 2px solid #f24a5a !important;\n}\n\n#loaderBackground {\n  background-color: white;\n  position: absolute;\n  width: 100%;\n  height: 100%;\n  z-index: 100;\n}\n\n.loader {\n  border: 16px solid #f3f3f3;\n  border-top: 16px solid #60a4ff;\n  border-radius: 50%;\n  width: 120px;\n  height: 120px;\n  position: fixed;\n  top: 45%;\n  left: 45%;\n  -webkit-animation: spin 1.5s linear infinite;\n          animation: spin 1.5s linear infinite;\n}\n\n@-webkit-keyframes spin {\n  0% {\n    transform: rotate(0deg);\n  }\n  100% {\n    transform: rotate(360deg);\n  }\n}\n\n@keyframes spin {\n  0% {\n    transform: rotate(0deg);\n  }\n  100% {\n    transform: rotate(360deg);\n  }\n}\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi9Vc2Vycy9iZW5qYW1pbmVtaWxpYW5pL1NhbnRyb3BvbHJvdWxhbnQvYW5ndWxhci1lbGVjdHJvbi9zcmMvYXBwL3NpZ24tdXAtc2hlZXQvc2lnbi11cC1zaGVldC5jb21wb25lbnQuc2NzcyIsInNyYy9hcHAvc2lnbi11cC1zaGVldC9zaWduLXVwLXNoZWV0LmNvbXBvbmVudC5zY3NzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUNBO0VBQ0UsaUJBQUE7RUFDQSxpQkFBQTtBQ0FGOztBREdBO0VBQ0UsZUFBQTtFQUNBLGtCQUFBO0VBQ0EsY0FBQTtBQ0FGOztBRElBO0VBQ0UsYUFBQTtFQUNBLDhCQUFBO0VBQ0EsbUJBQUE7QUNERjs7QURJQTtFQUNFLGlCQUFBO0VBQ0EsY0FBQTtFQUNBLFlBQUE7QUNERjs7QURLQTtFQUNFLGNBQUE7RUFDQSxpQkFBQTtFQUNBLFVBQUE7RUFDQSxpQkFBQTtFQUNBLGtCQUFBO0FDRkY7O0FES0E7RUFDRSxZQUFBO0FDRkY7O0FETUE7RUFDRSxlQUFBO0VBQ0EsVUFBQTtBQ0hGOztBRE1BO0VBQ0UseUJBQUE7RUFDQSxZQUFBO0VBQ0EsbUJBQUE7RUFDQSxzQkFBQTtFQUNBLGNBQUE7RUFDQSxTQUFBO0FDSEY7O0FETUE7RUFDRSxpQkFBQTtFQUNBLGFBQUE7RUFDQSxpQkFBQTtBQ0hGOztBRE1BO0VBQ0Usa0JBQUE7RUFDQSxTQUFBO0FDSEY7O0FETUE7RUFDRSxvQkFBQTtFQUNBLHNCQUFBO0VBQ0EsbUJBQUE7QUNIRjs7QURNQTtFQUNFLHlCQUFBO0VBQ0EsYUFBQTtBQ0hGOztBRE1BO0VBQ0Usb0JBQUE7QUNIRjs7QURNQTtFQUNFLGdCQUFBO0VBQ0EsYUFBQTtBQ0hGOztBRE1BO0VBQ0Usa0JBQUE7QUNIRjs7QURNQTtFQUNFLGVBQUE7QUNIRjs7QURNQTtFQUNFLG1CQUFBO0FDSEY7O0FETUE7RUFDRSxnQ0FBQTtBQ0hGOztBRE1BO0VBQ0UsU0FBQTtBQ0hGOztBRE1BO0VBQ0UsbUJBQUE7QUNIRjs7QURNQTtFQUNFLG1CQUFBO0FDSEY7O0FETUE7RUFDRSxzQkFBQTtBQ0hGOztBRE1BO0VBQ0Usa0JBQUE7RUFDQSxZQUFBO0VBQ0EseUJBQUE7QUNIRjs7QURNQTtFQUNFLFdBQUE7RUFDQSxnQkFBQTtBQ0hGOztBRE1BO0VBQ0UsaUJBQUE7QUNIRjs7QURNQTtFQUNFLFVBQUE7RUFDQSxXQUFBO0VBQ0EsaUJBQUE7QUNIRjs7QURNQTtFQUNFLHlCQUFBO0FDSEY7O0FETUE7RUFDRSx1QkFBQTtBQ0hGOztBRE1BO0VBQ0UsZUFBQTtBQ0hGOztBRE1BO0VBQ0UsWUFBQTtFQUNBLG9CQUFBO0VBQ0Esa0JBQUE7RUFDQSxlQUFBO0FDSEY7O0FETUE7RUFDRSxlQUFBO0FDSEY7O0FETUE7RUFDRSxpQkFBQTtFQUNBLGlCQUFBO0VBQ0EsZ0JBQUE7RUFDQSxpQkFBQTtFQUNBLFdBQUE7QUNIRjs7QURNQTtFQUNFLGVBQUE7RUFDQSxrQkFBQTtBQ0hGOztBRE1BO0VBQ0Usa0JBQUE7RUFDQSxtQkFBQTtFQUNBLGNBQUE7RUFDQSxrQkFBQTtFQUNBLFFBQUE7RUFDQSwyQkFBQTtBQ0hGOztBRE1BO0VBQ0Usb0NBQUE7QUNIRjs7QURNQTtFQUNFLHVCQUFBO0VBQ0Esa0JBQUE7RUFDQSxXQUFBO0VBQ0EsWUFBQTtFQUNBLFlBQUE7QUNIRjs7QURNQTtFQUNFLDBCQUFBO0VBQ0EsOEJBQUE7RUFDQSxrQkFBQTtFQUNBLFlBQUE7RUFDQSxhQUFBO0VBQ0EsZUFBQTtFQUNBLFFBQUE7RUFDQSxTQUFBO0VBQ0EsNENBQUE7VUFBQSxvQ0FBQTtBQ0hGOztBRE1BO0VBQ0U7SUFBSyx1QkFBQTtFQ0ZMO0VER0E7SUFBTyx5QkFBQTtFQ0FQO0FBQ0Y7O0FESEE7RUFDRTtJQUFLLHVCQUFBO0VDRkw7RURHQTtJQUFPLHlCQUFBO0VDQVA7QUFDRiIsImZpbGUiOiJzcmMvYXBwL3NpZ24tdXAtc2hlZXQvc2lnbi11cC1zaGVldC5jb21wb25lbnQuc2NzcyIsInNvdXJjZXNDb250ZW50IjpbIi8vIFBhZ2UgdGl0bGVcbi5wYWdlLXRpdGxlIHtcbiAgcGFkZGluZy10b3A6IDFyZW07XG4gIHBhZGRpbmctYm90dG9tOiAwO1xufVxuXG4ucGFnZS10aXRsZSBoMSB7XG4gIHBhZGRpbmc6IDAuNXJlbTtcbiAgdGV4dC1hbGlnbjogY2VudGVyO1xuICBjb2xvcjogIzYwYTRmZjtcbn1cblxuLy8gU2VhcmNoIGNvbnRhaW5lclxuLmNvbnRhaW5lci1zZWFyY2gge1xuICBkaXNwbGF5OiBmbGV4O1xuICBqdXN0aWZ5LWNvbnRlbnQ6IHNwYWNlLWJldHdlZW47XG4gIGFsaWduLWl0ZW1zOiBjZW50ZXI7XG59XG5cbi52b2x1bnRlZXItc2VhcmNoIHtcbiAgbWFyZ2luLWxlZnQ6IDIuNSU7XG4gIG1hcmdpbi10b3A6IDElO1xuICB3aWR0aDogNDAwcHg7XG59XG5cbi8vIFZvbHVudGVlciB0YWJsZVxuLm1hdC10YWJsZSB7XG4gIG92ZXJmbG93OiBhdXRvO1xuICBtYXgtaGVpZ2h0OiA1MDBweDtcbiAgd2lkdGg6IDk1JTtcbiAgbWFyZ2luLWxlZnQ6IDIuNSU7XG4gIG1hcmdpbi1yaWdodDogMi41JTtcbn1cblxudGgubWF0LXNvcnQtaGVhZGVyLXNvcnRlZCB7XG4gIGNvbG9yOiBibGFjaztcbn1cblxuLy8gRXhwYW5kZWQgRWxlbWVudFxuLmNvbnRhaW5lciB7XG4gIG1heC13aWR0aDogbm9uZTtcbiAgcGFkZGluZzogMDtcbn1cblxuLmNvbnRhaW5lciAuaGVhZGVyIHtcbiAgYmFja2dyb3VuZC1jb2xvcjogIzVmY2U5OTtcbiAgY29sb3I6IHdoaXRlO1xuICBwYWRkaW5nLXRvcDogMC41cmVtO1xuICBwYWRkaW5nLWJvdHRvbTogMC41cmVtO1xuICB3aWR0aDogaW5oZXJpdDtcbiAgbWFyZ2luOiAwO1xufVxuXG4udm9sdW50ZWVyLW5hbWUge1xuICBmb250LXdlaWdodDogYm9sZDtcbiAgZm9udC1zaXplOiAxNjtcbiAgbWFyZ2luLWxlZnQ6IDFyZW07XG59XG5cbi5hY3Rpb25zIHtcbiAgcG9zaXRpb246IGFic29sdXRlO1xuICByaWdodDogNSU7XG59XG5cbi52YWxpZ24tY2VudGVyIHtcbiAgZGlzcGxheTogaW5saW5lLWZsZXg7XG4gIHZlcnRpY2FsLWFsaWduOiBtaWRkbGU7XG4gIGFsaWduLWl0ZW1zOiBjZW50ZXI7XG59XG5cbi5ib2R5IHtcbiAgYmFja2dyb3VuZC1jb2xvcjogI2MxZWNkNztcbiAgcGFkZGluZzogMXJlbTtcbn1cblxuLnZhbGlnbi1jZW50ZXIgbWF0LWljb24ge1xuICBtYXJnaW4tcmlnaHQ6IDAuNXJlbTtcbn1cblxuLmVsZW1lbnQtZGV0YWlsIHtcbiAgb3ZlcmZsb3c6IGhpZGRlbjtcbiAgZGlzcGxheTogZmxleDtcbn1cblxuLmVsZW1lbnQtcm93IHtcbiAgcG9zaXRpb246IHJlbGF0aXZlO1xufVxuXG4uZWxlbWVudC1yb3c6bm90KC5leHBhbmRlZCkge1xuICBjdXJzb3I6IHBvaW50ZXI7XG59XG5cbi5lbGVtZW50LXJvdzpub3QoLmV4cGFuZGVkKTpob3ZlciB7XG4gIGJhY2tncm91bmQ6ICNmNWY1ZjU7XG59XG5cbi5lbGVtZW50LXJvdy5leHBhbmRlZCB7XG4gIGJvcmRlci1ib3R0b20tY29sb3I6IHRyYW5zcGFyZW50O1xufVxuXG50ci5kZXRhaWwtcm93IHtcbiAgaGVpZ2h0OiAwO1xufVxuXG50ci5lbGVtZW50LXJvdzpub3QoLmV4cGFuZGVkLXJvdyk6aG92ZXIge1xuICBiYWNrZ3JvdW5kOiAjZjVmNWY1O1xufVxuXG50ci5lbGVtZW50LXJvdzpub3QoLmV4cGFuZGVkLXJvdyk6YWN0aXZlIHtcbiAgYmFja2dyb3VuZDogI2VmZWZlZjtcbn1cblxuLmVsZW1lbnQtcm93IHRkIHtcbiAgYm9yZGVyLWJvdHRvbS13aWR0aDogMDtcbn1cblxuLmNhcmQtaGVhZGVyIHtcbiAgdGV4dC1hbGlnbjogY2VudGVyO1xuICBjb2xvcjogd2hpdGU7XG4gIGJhY2tncm91bmQtY29sb3I6ICM2MGE0ZmY7XG59XG5cbiNjYXJkVGl0bGUge1xuICB3aWR0aDogMTJ2dztcbiAgZm9udC1zaXplOiAwLjl2dztcbn1cblxuI2NhcmRUaXRsZTMge1xuICBmb250LXNpemU6IDAuOTZ2dztcbn1cblxuLmNhcmQtYm9keSB7XG4gIHBhZGRpbmc6IDA7XG4gIHdpZHRoOiAxMnZ3O1xuICBmb250LXNpemU6IDAuOTZ2dztcbn1cblxuLmtpdGNoZW5QTSAuY2FyZC1ib2R5IHtcbiAgYmFja2dyb3VuZC1jb2xvcjogI2Y0YWJhYTtcbn1cblxuLnJvdyB7XG4gIGp1c3RpZnktY29udGVudDogY2VudGVyO1xufVxuXG4uaW1nLWltcG9ydGFudC1ldmVudC1mYWxzZSB7XG4gIGN1cnNvcjogcG9pbnRlcjtcbn1cblxuYXBwLXBlcm1hbmVudC12b2x1bnRlZXIge1xuICBmbG9hdDogcmlnaHQ7XG4gIG1hcmdpbi1yaWdodDogMC41cmVtO1xuICBtYXJnaW4tdG9wOiAwLjJyZW07XG4gIGN1cnNvcjogcG9pbnRlcjtcbn1cblxuLmltZy1pbXBvcnRhbnQtZXZlbnQtdHJ1ZSB7XG4gIGN1cnNvcjogcG9pbnRlcjtcbn1cblxuI2xvZ28ge1xuICBtYXJnaW4tdG9wOiAtMzBweDtcbiAgbWFyZ2luLXJpZ2h0OiAyMCU7XG4gIG1heC13aWR0aDogMTIwcHg7XG4gIG1hcmdpbi1sZWZ0OiAtMzAlO1xuICB6LWluZGV4OiAtMTtcbn1cblxuaDEge1xuICBkaXNwbGF5OiBpbmxpbmU7XG4gIHRleHQtYWxpZ246IGNlbnRlcjtcbn1cblxuaDMge1xuICBtYXJnaW4tcmlnaHQ6IDE1cHg7XG4gIG1hcmdpbi1sZWZ0OiAtMy4xdnc7XG4gIGNvbG9yOiAjOTkxNjlkO1xuICBwb3NpdGlvbjogcmVsYXRpdmU7XG4gIHRvcDogNTAlO1xuICBmb250LXNpemU6IDEuNXZ3ICFpbXBvcnRhbnQ7XG59XG5cbi5ldmVudENhcmRJbXBvcnRhbnQge1xuICBib3JkZXI6IDJweCBzb2xpZCAjZjI0YTVhICFpbXBvcnRhbnQ7XG59XG5cbiNsb2FkZXJCYWNrZ3JvdW5ke1xuICBiYWNrZ3JvdW5kLWNvbG9yOiB3aGl0ZTtcbiAgcG9zaXRpb246IGFic29sdXRlO1xuICB3aWR0aDogMTAwJTtcbiAgaGVpZ2h0OiAxMDAlO1xuICB6LWluZGV4OiAxMDA7XG59XG5cbi5sb2FkZXIge1xuICBib3JkZXI6IDE2cHggc29saWQgI2YzZjNmMzsgXG4gIGJvcmRlci10b3A6IDE2cHggc29saWQgIzYwYTRmZjsgXG4gIGJvcmRlci1yYWRpdXM6IDUwJTtcbiAgd2lkdGg6IDEyMHB4O1xuICBoZWlnaHQ6IDEyMHB4O1xuICBwb3NpdGlvbjogZml4ZWQ7IFxuICB0b3A6IDQ1JTtcbiAgbGVmdDogNDUlO1xuICBhbmltYXRpb246IHNwaW4gMS41cyBsaW5lYXIgaW5maW5pdGU7XG59XG5cbkBrZXlmcmFtZXMgc3BpbiB7XG4gIDAlIHsgdHJhbnNmb3JtOiByb3RhdGUoMGRlZyk7IH1cbiAgMTAwJSB7IHRyYW5zZm9ybTogcm90YXRlKDM2MGRlZyk7IH1cbn0iLCIucGFnZS10aXRsZSB7XG4gIHBhZGRpbmctdG9wOiAxcmVtO1xuICBwYWRkaW5nLWJvdHRvbTogMDtcbn1cblxuLnBhZ2UtdGl0bGUgaDEge1xuICBwYWRkaW5nOiAwLjVyZW07XG4gIHRleHQtYWxpZ246IGNlbnRlcjtcbiAgY29sb3I6ICM2MGE0ZmY7XG59XG5cbi5jb250YWluZXItc2VhcmNoIHtcbiAgZGlzcGxheTogZmxleDtcbiAganVzdGlmeS1jb250ZW50OiBzcGFjZS1iZXR3ZWVuO1xuICBhbGlnbi1pdGVtczogY2VudGVyO1xufVxuXG4udm9sdW50ZWVyLXNlYXJjaCB7XG4gIG1hcmdpbi1sZWZ0OiAyLjUlO1xuICBtYXJnaW4tdG9wOiAxJTtcbiAgd2lkdGg6IDQwMHB4O1xufVxuXG4ubWF0LXRhYmxlIHtcbiAgb3ZlcmZsb3c6IGF1dG87XG4gIG1heC1oZWlnaHQ6IDUwMHB4O1xuICB3aWR0aDogOTUlO1xuICBtYXJnaW4tbGVmdDogMi41JTtcbiAgbWFyZ2luLXJpZ2h0OiAyLjUlO1xufVxuXG50aC5tYXQtc29ydC1oZWFkZXItc29ydGVkIHtcbiAgY29sb3I6IGJsYWNrO1xufVxuXG4uY29udGFpbmVyIHtcbiAgbWF4LXdpZHRoOiBub25lO1xuICBwYWRkaW5nOiAwO1xufVxuXG4uY29udGFpbmVyIC5oZWFkZXIge1xuICBiYWNrZ3JvdW5kLWNvbG9yOiAjNWZjZTk5O1xuICBjb2xvcjogd2hpdGU7XG4gIHBhZGRpbmctdG9wOiAwLjVyZW07XG4gIHBhZGRpbmctYm90dG9tOiAwLjVyZW07XG4gIHdpZHRoOiBpbmhlcml0O1xuICBtYXJnaW46IDA7XG59XG5cbi52b2x1bnRlZXItbmFtZSB7XG4gIGZvbnQtd2VpZ2h0OiBib2xkO1xuICBmb250LXNpemU6IDE2O1xuICBtYXJnaW4tbGVmdDogMXJlbTtcbn1cblxuLmFjdGlvbnMge1xuICBwb3NpdGlvbjogYWJzb2x1dGU7XG4gIHJpZ2h0OiA1JTtcbn1cblxuLnZhbGlnbi1jZW50ZXIge1xuICBkaXNwbGF5OiBpbmxpbmUtZmxleDtcbiAgdmVydGljYWwtYWxpZ246IG1pZGRsZTtcbiAgYWxpZ24taXRlbXM6IGNlbnRlcjtcbn1cblxuLmJvZHkge1xuICBiYWNrZ3JvdW5kLWNvbG9yOiAjYzFlY2Q3O1xuICBwYWRkaW5nOiAxcmVtO1xufVxuXG4udmFsaWduLWNlbnRlciBtYXQtaWNvbiB7XG4gIG1hcmdpbi1yaWdodDogMC41cmVtO1xufVxuXG4uZWxlbWVudC1kZXRhaWwge1xuICBvdmVyZmxvdzogaGlkZGVuO1xuICBkaXNwbGF5OiBmbGV4O1xufVxuXG4uZWxlbWVudC1yb3cge1xuICBwb3NpdGlvbjogcmVsYXRpdmU7XG59XG5cbi5lbGVtZW50LXJvdzpub3QoLmV4cGFuZGVkKSB7XG4gIGN1cnNvcjogcG9pbnRlcjtcbn1cblxuLmVsZW1lbnQtcm93Om5vdCguZXhwYW5kZWQpOmhvdmVyIHtcbiAgYmFja2dyb3VuZDogI2Y1ZjVmNTtcbn1cblxuLmVsZW1lbnQtcm93LmV4cGFuZGVkIHtcbiAgYm9yZGVyLWJvdHRvbS1jb2xvcjogdHJhbnNwYXJlbnQ7XG59XG5cbnRyLmRldGFpbC1yb3cge1xuICBoZWlnaHQ6IDA7XG59XG5cbnRyLmVsZW1lbnQtcm93Om5vdCguZXhwYW5kZWQtcm93KTpob3ZlciB7XG4gIGJhY2tncm91bmQ6ICNmNWY1ZjU7XG59XG5cbnRyLmVsZW1lbnQtcm93Om5vdCguZXhwYW5kZWQtcm93KTphY3RpdmUge1xuICBiYWNrZ3JvdW5kOiAjZWZlZmVmO1xufVxuXG4uZWxlbWVudC1yb3cgdGQge1xuICBib3JkZXItYm90dG9tLXdpZHRoOiAwO1xufVxuXG4uY2FyZC1oZWFkZXIge1xuICB0ZXh0LWFsaWduOiBjZW50ZXI7XG4gIGNvbG9yOiB3aGl0ZTtcbiAgYmFja2dyb3VuZC1jb2xvcjogIzYwYTRmZjtcbn1cblxuI2NhcmRUaXRsZSB7XG4gIHdpZHRoOiAxMnZ3O1xuICBmb250LXNpemU6IDAuOXZ3O1xufVxuXG4jY2FyZFRpdGxlMyB7XG4gIGZvbnQtc2l6ZTogMC45NnZ3O1xufVxuXG4uY2FyZC1ib2R5IHtcbiAgcGFkZGluZzogMDtcbiAgd2lkdGg6IDEydnc7XG4gIGZvbnQtc2l6ZTogMC45NnZ3O1xufVxuXG4ua2l0Y2hlblBNIC5jYXJkLWJvZHkge1xuICBiYWNrZ3JvdW5kLWNvbG9yOiAjZjRhYmFhO1xufVxuXG4ucm93IHtcbiAganVzdGlmeS1jb250ZW50OiBjZW50ZXI7XG59XG5cbi5pbWctaW1wb3J0YW50LWV2ZW50LWZhbHNlIHtcbiAgY3Vyc29yOiBwb2ludGVyO1xufVxuXG5hcHAtcGVybWFuZW50LXZvbHVudGVlciB7XG4gIGZsb2F0OiByaWdodDtcbiAgbWFyZ2luLXJpZ2h0OiAwLjVyZW07XG4gIG1hcmdpbi10b3A6IDAuMnJlbTtcbiAgY3Vyc29yOiBwb2ludGVyO1xufVxuXG4uaW1nLWltcG9ydGFudC1ldmVudC10cnVlIHtcbiAgY3Vyc29yOiBwb2ludGVyO1xufVxuXG4jbG9nbyB7XG4gIG1hcmdpbi10b3A6IC0zMHB4O1xuICBtYXJnaW4tcmlnaHQ6IDIwJTtcbiAgbWF4LXdpZHRoOiAxMjBweDtcbiAgbWFyZ2luLWxlZnQ6IC0zMCU7XG4gIHotaW5kZXg6IC0xO1xufVxuXG5oMSB7XG4gIGRpc3BsYXk6IGlubGluZTtcbiAgdGV4dC1hbGlnbjogY2VudGVyO1xufVxuXG5oMyB7XG4gIG1hcmdpbi1yaWdodDogMTVweDtcbiAgbWFyZ2luLWxlZnQ6IC0zLjF2dztcbiAgY29sb3I6ICM5OTE2OWQ7XG4gIHBvc2l0aW9uOiByZWxhdGl2ZTtcbiAgdG9wOiA1MCU7XG4gIGZvbnQtc2l6ZTogMS41dncgIWltcG9ydGFudDtcbn1cblxuLmV2ZW50Q2FyZEltcG9ydGFudCB7XG4gIGJvcmRlcjogMnB4IHNvbGlkICNmMjRhNWEgIWltcG9ydGFudDtcbn1cblxuI2xvYWRlckJhY2tncm91bmQge1xuICBiYWNrZ3JvdW5kLWNvbG9yOiB3aGl0ZTtcbiAgcG9zaXRpb246IGFic29sdXRlO1xuICB3aWR0aDogMTAwJTtcbiAgaGVpZ2h0OiAxMDAlO1xuICB6LWluZGV4OiAxMDA7XG59XG5cbi5sb2FkZXIge1xuICBib3JkZXI6IDE2cHggc29saWQgI2YzZjNmMztcbiAgYm9yZGVyLXRvcDogMTZweCBzb2xpZCAjNjBhNGZmO1xuICBib3JkZXItcmFkaXVzOiA1MCU7XG4gIHdpZHRoOiAxMjBweDtcbiAgaGVpZ2h0OiAxMjBweDtcbiAgcG9zaXRpb246IGZpeGVkO1xuICB0b3A6IDQ1JTtcbiAgbGVmdDogNDUlO1xuICBhbmltYXRpb246IHNwaW4gMS41cyBsaW5lYXIgaW5maW5pdGU7XG59XG5cbkBrZXlmcmFtZXMgc3BpbiB7XG4gIDAlIHtcbiAgICB0cmFuc2Zvcm06IHJvdGF0ZSgwZGVnKTtcbiAgfVxuICAxMDAlIHtcbiAgICB0cmFuc2Zvcm06IHJvdGF0ZSgzNjBkZWcpO1xuICB9XG59Il19 */");

/***/ }),

/***/ "./src/app/sign-up-sheet/sign-up-sheet.component.ts":
/*!**********************************************************!*\
  !*** ./src/app/sign-up-sheet/sign-up-sheet.component.ts ***!
  \**********************************************************/
/*! exports provided: myCustomTooltipDefaults, SignUpSheetComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "myCustomTooltipDefaults", function() { return myCustomTooltipDefaults; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "SignUpSheetComponent", function() { return SignUpSheetComponent; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/__ivy_ngcc__/fesm2015/core.js");
/* harmony import */ var _angular_animations__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/animations */ "./node_modules/@angular/animations/__ivy_ngcc__/fesm2015/animations.js");
/* harmony import */ var _angular_fire_database__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/fire/database */ "./node_modules/@angular/fire/__ivy_ngcc__/fesm2015/angular-fire-database.js");
/* harmony import */ var _angular_material_table__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @angular/material/table */ "./node_modules/@angular/material/__ivy_ngcc__/fesm2015/table.js");
/* harmony import */ var _angular_material_sort__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @angular/material/sort */ "./node_modules/@angular/material/__ivy_ngcc__/fesm2015/sort.js");
/* harmony import */ var bootstrap_dist_js_bootstrap_bundle__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! bootstrap/dist/js/bootstrap.bundle */ "./node_modules/bootstrap/dist/js/bootstrap.bundle.js");
/* harmony import */ var bootstrap_dist_js_bootstrap_bundle__WEBPACK_IMPORTED_MODULE_5___default = /*#__PURE__*/__webpack_require__.n(bootstrap_dist_js_bootstrap_bundle__WEBPACK_IMPORTED_MODULE_5__);
/* harmony import */ var _firebase_service_service__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ../firebase-service.service */ "./src/app/firebase-service.service.ts");
/* harmony import */ var _angular_material_tooltip__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! @angular/material/tooltip */ "./node_modules/@angular/material/__ivy_ngcc__/fesm2015/tooltip.js");
var __decorate = (undefined && undefined.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (undefined && undefined.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __importDefault = (undefined && undefined.__importDefault) || function (mod) {
  return (mod && mod.__esModule) ? mod : { "default": mod };
};








const myCustomTooltipDefaults = {
    showDelay: 1000,
    hideDelay: 500,
    touchendHideDelay: 1000,
};
let SignUpSheetComponent = class SignUpSheetComponent {
    constructor(db, fs) {
        this.db = db;
        this.fs = fs;
        this.displayedColumns = ['event_date_txt', 'first_name', 'last_name', 'event_type', 'actions'];
        this.isCollapsed = true;
        this.volunteerList = [];
        this.volunteerListInitialized = false;
        this.dataSource = new _angular_material_table__WEBPACK_IMPORTED_MODULE_3__["MatTableDataSource"]();
        this.currentWeek = "first";
        this.eventTypes = {
            "Kitchen AM": "kitam",
            "Kitchen PM": "kitpm",
            "Delivery Driver": "deldr",
            "Delivery": "deliv",
        };
        this.eventTypesCool = {
            "kitam": "Kitchen AM",
            "kitpm": "Kitchen PM",
            "deldr": "Delivery Driver",
            "deliv": "Delivery",
        };
        this.eventArray = ["Kitchen AM", "Kitchen PM", "Delivery Driver", "Delivery"];
        this.currentEvent = "Kitchen AM";
        this.pane = "left";
    }
    ngOnInit() {
        this.events = this.fs.getEvents();
        this.fs.getEvents().subscribe(snapshots => {
            // snapshots.forEach(element => {
            //   element.phone_number = this.prettifyPhoneNumber(element.phone_number)
            // });
            this.dataSource = new _angular_material_table__WEBPACK_IMPORTED_MODULE_3__["MatTableDataSource"](snapshots);
            this.dataSource.sort = this.sort;
            // let temp = Object.keys(this.volunteers[0]);
            // temp = temp.filter(e => !this.displayedColumns.includes(e));
        });
        this.formatEventDates();
        this.volunteers = this.fs.getUsers();
        this.setVolunteerList();
        this.db.list('event').auditTrail().subscribe(changes => {
            this.formatEventDates();
            this.volunteers = this.fs.getUsers();
            this.setVolunteerList();
        });
        this.removeLoading();
    }
    removeLoading() {
        var spinner = document.getElementById("spinner");
        var spinnerBackgrond = document.getElementById("loaderBackground");
        setTimeout(function () {
            spinner.style.display = "none";
            spinnerBackgrond.style.display = "none";
        }, 1400);
    }
    prettify(str) {
        let string = str.replace('_', ' ');
        return string.charAt(0).toUpperCase() + string.slice(1);
    }
    prettifyPhoneNumber(str) {
        let a = str.charAt(0) + str.charAt(1) + str.charAt(2);
        let b = str.charAt(3) + str.charAt(4) + str.charAt(5);
        let c = str.charAt(6) + str.charAt(7) + str.charAt(8) + str.charAt(9);
        let phoneNumber = '(' + a + ') ' + b + '-' + c;
        return phoneNumber;
    }
    setVolunteerList() {
        this.volunteers.subscribe((snapshots) => {
            if (this.volunteerListInitialized === true) {
                this.volunteerList = [];
            }
            this.volunteerListInitialized = false;
            snapshots.forEach((snapshot) => {
                this.volunteerList.push(snapshot);
            });
        });
    }
    formatEventDates() {
        const events_per_week = 125;
        this.events.subscribe((snapshots) => {
            let i = 0;
            this.week1 = [];
            this.week2 = [];
            this.week3 = [];
            snapshots.forEach((snapshot) => {
                snapshot.event_date = this.fs.formatDate(snapshot.event_date.toString());
                const event_type = snapshot.event_type.toString();
                const event_date = snapshot.event_date;
                if (i < events_per_week) {
                    if (!(event_type in this.week1)) {
                        this.week1[event_type] = {};
                    }
                    if (!(event_date in this.week1[event_type])) {
                        this.week1[event_type][event_date] = {
                            slots: [],
                            num_volunteers: 0,
                            num_slots: 0,
                            is_important_event: snapshot.is_important_event,
                            display_date: this.getDisplayDate(event_date),
                        };
                    }
                    if (snapshot.first_name) {
                        this.week1[event_type][event_date]["num_volunteers"] =
                            this.week1[event_type][event_date]["num_volunteers"] + 1;
                    }
                    this.week1[event_type][event_date]["num_slots"] =
                        this.week1[event_type][event_date]["num_slots"] + 1;
                    this.week1[event_type][event_date]["slots"].push(snapshot);
                }
                else if (i >= events_per_week && i < 2 * events_per_week) {
                    if (!(event_type in this.week2)) {
                        this.week2[event_type] = {};
                    }
                    if (!(event_date in this.week2[event_type])) {
                        this.week2[event_type][event_date] = {
                            slots: [],
                            num_volunteers: 0,
                            num_slots: 0,
                            is_important_event: snapshot.is_important_event,
                            display_date: this.getDisplayDate(event_date),
                        };
                    }
                    if (snapshot.first_name) {
                        this.week2[event_type][event_date]["num_volunteers"] =
                            this.week2[event_type][event_date]["num_volunteers"] + 1;
                    }
                    this.week2[event_type][event_date]["num_slots"] =
                        this.week2[event_type][event_date]["num_slots"] + 1;
                    this.week2[event_type][event_date]["slots"].push(snapshot);
                }
                else {
                    if (!(event_type in this.week3)) {
                        this.week3[event_type] = {};
                    }
                    if (!(event_date in this.week3[event_type])) {
                        this.week3[event_type][event_date] = {
                            slots: [],
                            num_volunteers: 0,
                            num_slots: 0,
                            is_important_event: snapshot.is_important_event,
                            display_date: this.getDisplayDate(event_date),
                        };
                    }
                    if (snapshot.first_name) {
                        this.week3[event_type][event_date]["num_volunteers"] =
                            this.week3[event_type][event_date]["num_volunteers"] + 1;
                    }
                    this.week3[event_type][event_date]["num_slots"] =
                        this.week3[event_type][event_date]["num_slots"] + 1;
                    this.week3[event_type][event_date]["slots"].push(snapshot);
                }
                i = i + 1;
            });
            this.weekRange1 = this.setWeekRange(this.week1);
            this.weekRange2 = this.setWeekRange(this.week2);
            this.weekRange3 = this.setWeekRange(this.week3);
            //console.log(this.week1);
        });
    }
    isPermanentEvent(slot) {
        return "permanent_event_id" in slot;
    }
    getDisplayDate(date) {
        return new Date(date);
    }
    nextWeek() {
        this.currentWeek = this.currentWeek === "first" ? "second" : "third";
    }
    prevWeek() {
        this.currentWeek = this.currentWeek === "third" ? "second" : "first";
    }
    getWeekTitle() {
        this.weekRange1 = this.setWeekRange(this.week1);
        this.weekRange2 = this.setWeekRange(this.week2);
        this.weekRange3 = this.setWeekRange(this.week3);
        if (this.currentWeek == "first") {
            return this.weekRange1;
        }
        else if (this.currentWeek == "second") {
            return this.weekRange2;
        }
        else {
            return this.weekRange3;
        }
    }
    setWeekRange(week) {
        if (week) {
            var week_title = "";
            const event = Object.keys(week)[0];
            const monday = new Date(Object.keys(week[event])[0]);
            const monday_month = monday.toLocaleString("default", { month: "long" });
            const monday_date = monday.getDate();
            const monday_year = monday.getFullYear();
            var saturday = new Date(monday.getTime() + 5 * 86400000);
            const saturday_month = saturday.toLocaleString("default", {
                month: "long",
            });
            const saturday_date = saturday.getDate();
            const saturday_year = saturday.getFullYear();
            if (monday_month != saturday_month) {
                if (monday_year != saturday_year) {
                    week_title =
                        monday_month +
                            " " +
                            monday_date +
                            ", " +
                            monday_year +
                            " - " +
                            saturday_month +
                            " " +
                            saturday_date +
                            ", " +
                            saturday_year;
                }
                else {
                    week_title =
                        monday_month +
                            " " +
                            monday_date +
                            " - " +
                            saturday_month +
                            " " +
                            saturday_date +
                            ", " +
                            monday_year;
                }
            }
            else {
                week_title =
                    monday_month +
                        " " +
                        monday_date +
                        " - " +
                        saturday_date +
                        ", " +
                        monday_year;
            }
            return week_title;
        }
    }
    applyFilter(filterValue) {
        this.dataSource.filter = filterValue.trim().toLowerCase();
    }
    getLastDate(week) {
        const event = Object.keys(week)[0];
        const monday = new Date(Object.keys(week[event])[0]);
        const monday_month = monday.toLocaleString("default", { month: "long" });
        const monday_date = monday.getDate();
        const monday_year = monday.getFullYear();
        var saturday = new Date(monday.getTime() + 5 * 86400000);
        return saturday;
    }
    getEventList() {
        var currentEventValue = this.eventTypes[this.currentEvent];
        if (this.currentWeek == "first") {
            return this.week1[currentEventValue];
        }
        else if (this.currentWeek == "second") {
            return this.week2[currentEventValue];
        }
        else {
            return this.week3[currentEventValue];
        }
    }
    getEventName(eventType) {
        return this.eventTypesCool[eventType];
    }
    getEventListCool(eventType) {
        var currentEventValue = this.eventTypes[eventType];
        if (this.currentWeek == "first") {
            let week1 = Object.keys(this.week1[currentEventValue]);
            if (week1.length == 5) {
                this.addEmptyThursday(this.week1[currentEventValue]);
            }
            return this.week1[currentEventValue];
        }
        else if (this.currentWeek == "second") {
            let week2 = Object.keys(this.week2[currentEventValue]);
            if (week2.length == 5) {
                this.addEmptyThursday(this.week2[currentEventValue]);
            }
            return this.week2[currentEventValue];
        }
        else {
            return this.week3[currentEventValue];
        }
    }
    addEmptyThursday(obj) {
        const monday = new Date(Object.keys(obj)[0]);
        const mond = monday.getMonth();
        const thursday = new Date(monday.getTime() + 3 * 86400000);
        const day = thursday.getDate() < 10 ? "0" + thursday.getDate() : thursday.getDate();
        const month = thursday.getMonth() < 10
            ? "0" + (thursday.getMonth() + 1)
            : thursday.getMonth() + 1;
        // console.log(month);
        const year = thursday.getFullYear();
        const date = month + "/" + day + "/" + year;
        console.log(date);
        obj[date] = {
            slots: [
                {
                    id: "N/A",
                    event_date: date,
                    event_time_end: "N/A",
                    event_time_start: "N/A",
                },
            ],
            num_volunteers: 0,
            num_slots: 0,
            is_important_event: false,
            display_date: this.getDisplayDate(date),
        };
        //console.log(obj);
    }
    changeEventImportance(day) {
        var slots;
        var is_important_event;
        var currentEventValue = this.eventTypes[this.currentEvent];
        if (this.currentWeek == "first") {
            is_important_event = !this.week1[currentEventValue][day]["is_important_event"];
            this.week1[currentEventValue][day]["is_important_event"] = is_important_event;
            slots = this.week1[currentEventValue][day]["slots"];
        }
        else if (this.currentWeek == "second") {
            is_important_event = this.week2[currentEventValue][day]["is_important_event"];
            this.week2[currentEventValue][day]["is_important_event"] = !is_important_event;
            slots = this.week2[currentEventValue][day]["slots"];
        }
        else {
            is_important_event = this.week3[currentEventValue][day]["is_important_event"];
            this.week3[currentEventValue][day]["is_important_event"] = !is_important_event;
            slots = this.week3[currentEventValue][day]["slots"];
        }
        for (var slot of slots) {
            this.fs.changeEventImportance(slot["id"], is_important_event);
        }
    }
    changeEventImportanceCool(day, eventType) {
        var slots;
        var is_important_event;
        var currentEventValue = this.eventTypes[eventType];
        //console.log(currentEventValue + "    sssss");
        if (this.currentWeek == "first") {
            is_important_event = !this.week1[currentEventValue][day]["is_important_event"];
            this.week1[currentEventValue][day]["is_important_event"] = is_important_event;
            slots = this.week1[currentEventValue][day]["slots"];
        }
        else if (this.currentWeek == "second") {
            is_important_event = !this.week2[currentEventValue][day]["is_important_event"];
            this.week2[currentEventValue][day]["is_important_event"] = is_important_event;
            slots = this.week2[currentEventValue][day]["slots"];
        }
        else {
            is_important_event = !this.week3[currentEventValue][day]["is_important_event"];
            this.week3[currentEventValue][day]["is_important_event"] = is_important_event;
            slots = this.week3[currentEventValue][day]["slots"];
        }
        for (var slot of slots) {
            this.fs.changeEventImportance(slot["id"], is_important_event);
        }
    }
    getVolunteerList() {
        return this.volunteerList;
    }
    getSignUpData() {
        return [
            { slot: 0, volunteer: "alexa" },
            { slot: 1, volunteer: "alexa" },
            { slot: 2, volunteer: "alexa" },
        ];
    }
    removeUserFromEvent(event_id) {
        this.fs.removeUserFromEvent(event_id);
    }
    addUserToEvent(user, event_info) {
        var event_id = event_info.slots[event_info.num_volunteers].id;
        this.fs.addUserToEvent(event_id, user.first_name, user.last_name, user.key);
    }
    // permanentVolunteerEvent(event, event_id, user_id, event_date, first_name, last_name, slot) {
    //   if ( event.event == "remove" ) {
    //     const data = event.removePermanentVolunteerData;
    //     const event_type =  this.eventTypes[data.eventType];
    //     const freq = slot.permanent_event_id.slice(-1);
    //     const associatedPermanentEvents = this.getAssociatedPermanentEvents(event_date, freq, this.eventTypes[data.eventType], true);
    //     this.fs.removePermanentVolunteer(
    //       slot.permanent_event_id
    //     )
    //     for(let i = 0; i < associatedPermanentEvents.length; i++) {
    //       this.fs.removePermanentVolunteerEvents(associatedPermanentEvents[i]);
    //     }
    //   }
    //   if ( event.event == "add" ) {
    //     const data = event.addPermanentVolunteerData;
    //     const event_type =  this.eventTypes[data.eventType];
    //     const associatedPermanentEvents = this.getAssociatedPermanentEvents(event_date, data.frequency, event_type, false);
    //     this.fs.addPermanentVolunteer(
    //       event_type,
    //       user_id,
    //       data.weekday,
    //       event_date,
    //       data.endDate,
    //       data.frequency,
    //       event_id
    //     );
    //     this.fs.addPermanentVolunteerEvents(
    //       associatedPermanentEvents,
    //       user_id,
    //       first_name,
    //       last_name,
    //       this.eventTypes[data.eventType] + '_' + data.weekday + '_' + user_id + '_' + data.frequency
    //     )
    //   }
    // }
    getAssociatedPermanentEvents(startDate, frequency, event_type, remove) {
        const associatedPermanentEvents = [];
        const lastDate = this.getLastDate(this.week3);
        let currentDate = startDate;
        while (currentDate.getTime() <= lastDate.getTime()) {
            const year = currentDate.getFullYear().toString();
            let month = currentDate.getMonth() + 1;
            month = month < 9 ? "0" + month.toString() : month.toString();
            let day = currentDate.getDate();
            day = day < 9 ? "0" + day.toString() : day.toString();
            const event_date = month + "/" + day + "/" + year;
            let slot_num;
            if (event_date in this.week1[event_type]) {
                slot_num = this.week1[event_type][event_date].num_volunteers;
            }
            else if (event_date in this.week2[event_type]) {
                slot_num = this.week2[event_type][event_date].num_volunteers;
            }
            else {
                slot_num = this.week3[event_type][event_date].num_volunteers;
            }
            slot_num =
                currentDate.getTime() === startDate.getTime() || remove
                    ? slot_num
                    : slot_num + 1;
            slot_num = slot_num < 9 ? "0" + slot_num.toString() : slot_num.toString();
            const event_id = year.slice(-2) + month + day + event_type + slot_num;
            associatedPermanentEvents.push(event_id);
            currentDate = new Date(currentDate.getTime() + 1000 * 604800 * frequency);
        }
        console.log("associatedper");
        console.log(associatedPermanentEvents);
        return associatedPermanentEvents;
    }
    insertStaffNote(event) {
        this.fs.addStaffNoteToEvent(event.event_id, event.staff_note);
    }
    updateEventNote(event_id, event_note) {
        console.log("update event");
        //console.log(event_id);
        //console.log(event_note);
        this.fs.updateEventNote(event_id, event_note);
    }
};
SignUpSheetComponent.ctorParameters = () => [
    { type: _angular_fire_database__WEBPACK_IMPORTED_MODULE_2__["AngularFireDatabase"] },
    { type: _firebase_service_service__WEBPACK_IMPORTED_MODULE_6__["FirebaseService"] }
];
__decorate([
    Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["ViewChild"])(_angular_material_sort__WEBPACK_IMPORTED_MODULE_4__["MatSort"], { static: true }),
    __metadata("design:type", _angular_material_sort__WEBPACK_IMPORTED_MODULE_4__["MatSort"])
], SignUpSheetComponent.prototype, "sort", void 0);
SignUpSheetComponent = __decorate([
    Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["Component"])({
        selector: "app-sign-up-sheet",
        template: __importDefault(__webpack_require__(/*! raw-loader!./sign-up-sheet.component.html */ "./node_modules/raw-loader/dist/cjs.js!./src/app/sign-up-sheet/sign-up-sheet.component.html")).default,
        providers: [
            { provide: _angular_material_tooltip__WEBPACK_IMPORTED_MODULE_7__["MAT_TOOLTIP_DEFAULT_OPTIONS"], useValue: myCustomTooltipDefaults },
        ],
        animations: [
            Object(_angular_animations__WEBPACK_IMPORTED_MODULE_1__["trigger"])('detailExpand', [
                Object(_angular_animations__WEBPACK_IMPORTED_MODULE_1__["state"])('collapsed', Object(_angular_animations__WEBPACK_IMPORTED_MODULE_1__["style"])({ height: '0px', minHeight: '0', display: 'none' })),
                Object(_angular_animations__WEBPACK_IMPORTED_MODULE_1__["state"])('expanded', Object(_angular_animations__WEBPACK_IMPORTED_MODULE_1__["style"])({ height: '*' })),
                Object(_angular_animations__WEBPACK_IMPORTED_MODULE_1__["transition"])('expanded <=> collapsed', Object(_angular_animations__WEBPACK_IMPORTED_MODULE_1__["animate"])('225ms cubic-bezier(0.4, 0.0, 0.2, 1)')),
            ]),
        ],
        styles: [__importDefault(__webpack_require__(/*! ./sign-up-sheet.component.scss */ "./src/app/sign-up-sheet/sign-up-sheet.component.scss")).default]
    }),
    __metadata("design:paramtypes", [_angular_fire_database__WEBPACK_IMPORTED_MODULE_2__["AngularFireDatabase"], _firebase_service_service__WEBPACK_IMPORTED_MODULE_6__["FirebaseService"]])
], SignUpSheetComponent);



/***/ }),

/***/ "./src/app/sign-up-sheet/staff-note/staff-note.component.scss":
/*!********************************************************************!*\
  !*** ./src/app/sign-up-sheet/staff-note/staff-note.component.scss ***!
  \********************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony default export */ __webpack_exports__["default"] = ("::ng-deep .staff-note .modal-dialog {\n  max-width: 40%;\n  width: 40%;\n}\n\n.modal-header {\n  background-color: #5fce99;\n}\n\n.modal-title {\n  color: white;\n}\n\n.modal-body {\n  padding: 1rem 4rem 1rem 4rem;\n}\n\n.footer {\n  padding-top: 1rem;\n  padding-bottom: 2.5rem;\n  text-align: center;\n}\n\n.btn-insert-staff-note {\n  background-color: #5fce99 !important;\n  color: white !important;\n  border-color: #5fce99 !important;\n}\n\n.btn-insert-staff-note:hover {\n  background-color: #40c485 !important;\n  border-color: #40c485 !important;\n}\n\n.btn-cancel {\n  color: #5fce99 !important;\n  border-color: #5fce99 !important;\n  margin-right: 1rem;\n}\n\n.btn-cancel:hover {\n  background-color: #5fce99 !important;\n  color: white !important;\n}\n\n.desc {\n  margin-bottom: 1.5rem;\n}\n\n.note {\n  justify-content: center;\n}\n\n.mat-form-field {\n  width: 100%;\n}\n\np {\n  font-family: Lato;\n}\n\n[contenteditable] {\n  border: 1px solid black;\n  padding: 16px;\n  outline: 0;\n  line-height: 30px;\n  height: 300px;\n  overflow-y: auto;\n  white-space: pre-wrap;\n}\n\n[contenteditable]:focus {\n  border-color: blue;\n}\n\n.close:focus {\n  outline: none;\n}\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi9Vc2Vycy9iZW5qYW1pbmVtaWxpYW5pL1NhbnRyb3BvbHJvdWxhbnQvYW5ndWxhci1lbGVjdHJvbi9zcmMvYXBwL3NpZ24tdXAtc2hlZXQvc3RhZmYtbm90ZS9zdGFmZi1ub3RlLmNvbXBvbmVudC5zY3NzIiwic3JjL2FwcC9zaWduLXVwLXNoZWV0L3N0YWZmLW5vdGUvc3RhZmYtbm90ZS5jb21wb25lbnQuc2NzcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQTtFQUNLLGNBQUE7RUFDQSxVQUFBO0FDQ0w7O0FER0E7RUFDRSx5QkFBQTtBQ0FGOztBREdBO0VBQ0UsWUFBQTtBQ0FGOztBREdBO0VBQ0UsNEJBQUE7QUNBRjs7QURHQTtFQUNFLGlCQUFBO0VBQ0Esc0JBQUE7RUFDQSxrQkFBQTtBQ0FGOztBREdBO0VBQ0Usb0NBQUE7RUFDQSx1QkFBQTtFQUNBLGdDQUFBO0FDQUY7O0FER0E7RUFDRSxvQ0FBQTtFQUNBLGdDQUFBO0FDQUY7O0FER0E7RUFDRSx5QkFBQTtFQUNBLGdDQUFBO0VBQ0Esa0JBQUE7QUNBRjs7QURHQTtFQUNFLG9DQUFBO0VBQ0EsdUJBQUE7QUNBRjs7QURHQTtFQUNFLHFCQUFBO0FDQUY7O0FER0E7RUFDRSx1QkFBQTtBQ0FGOztBREdBO0VBQ0UsV0FBQTtBQ0FGOztBRElBO0VBQ0UsaUJBQUE7QUNERjs7QURJQTtFQUNFLHVCQUFBO0VBQ0EsYUFBQTtFQUNBLFVBQUE7RUFDQSxpQkFBQTtFQUNBLGFBQUE7RUFDQSxnQkFBQTtFQUNBLHFCQUFBO0FDREY7O0FESUE7RUFDRSxrQkFBQTtBQ0RGOztBRElBO0VBQ0UsYUFBQTtBQ0RGIiwiZmlsZSI6InNyYy9hcHAvc2lnbi11cC1zaGVldC9zdGFmZi1ub3RlL3N0YWZmLW5vdGUuY29tcG9uZW50LnNjc3MiLCJzb3VyY2VzQ29udGVudCI6WyI6Om5nLWRlZXAgLnN0YWZmLW5vdGUgLm1vZGFsLWRpYWxvZyB7XG4gICAgIG1heC13aWR0aDogNDAlO1xuICAgICB3aWR0aDogNDAlO1xufVxuXG5cbi5tb2RhbC1oZWFkZXJ7XG4gIGJhY2tncm91bmQtY29sb3I6ICM1ZmNlOTk7XG59XG5cbi5tb2RhbC10aXRsZXtcbiAgY29sb3I6IHdoaXRlO1xufVxuXG4ubW9kYWwtYm9keSB7XG4gIHBhZGRpbmc6IDFyZW0gNHJlbSAxcmVtIDRyZW07XG59XG5cbi5mb290ZXIge1xuICBwYWRkaW5nLXRvcDogMXJlbTtcbiAgcGFkZGluZy1ib3R0b206IDIuNXJlbTtcbiAgdGV4dC1hbGlnbjogY2VudGVyO1xufVxuXG4uYnRuLWluc2VydC1zdGFmZi1ub3RlIHtcbiAgYmFja2dyb3VuZC1jb2xvcjogIzVmY2U5OSAhaW1wb3J0YW50O1xuICBjb2xvcjogd2hpdGUgIWltcG9ydGFudDtcbiAgYm9yZGVyLWNvbG9yOiAjNWZjZTk5ICFpbXBvcnRhbnQ7XG59XG5cbi5idG4taW5zZXJ0LXN0YWZmLW5vdGU6aG92ZXIge1xuICBiYWNrZ3JvdW5kLWNvbG9yOiAjNDBjNDg1ICFpbXBvcnRhbnQ7XG4gIGJvcmRlci1jb2xvcjogIzQwYzQ4NSAhaW1wb3J0YW50O1xufVxuXG4uYnRuLWNhbmNlbCB7XG4gIGNvbG9yOiM1ZmNlOTkgIWltcG9ydGFudDtcbiAgYm9yZGVyLWNvbG9yOiM1ZmNlOTkgIWltcG9ydGFudDtcbiAgbWFyZ2luLXJpZ2h0OjFyZW07XG59XG5cbi5idG4tY2FuY2VsOmhvdmVyIHtcbiAgYmFja2dyb3VuZC1jb2xvcjogIzVmY2U5OSAhaW1wb3J0YW50O1xuICBjb2xvcjogd2hpdGUgIWltcG9ydGFudDtcbn1cblxuLmRlc2Mge1xuICBtYXJnaW4tYm90dG9tOiAxLjVyZW07XG59XG5cbi5ub3RlIHtcbiAganVzdGlmeS1jb250ZW50OiBjZW50ZXI7XG59XG5cbi5tYXQtZm9ybS1maWVsZCB7XG4gIHdpZHRoOiAxMDAlO1xuXG59XG5cbnAge1xuICBmb250LWZhbWlseTogTGF0bztcbn1cblxuW2NvbnRlbnRlZGl0YWJsZV0ge1xuICBib3JkZXI6IDFweCBzb2xpZCBibGFjaztcbiAgcGFkZGluZzogMTZweDtcbiAgb3V0bGluZTogMDtcbiAgbGluZS1oZWlnaHQ6IDMwcHg7XG4gIGhlaWdodDogMzAwcHg7XG4gIG92ZXJmbG93LXk6IGF1dG87XG4gIHdoaXRlLXNwYWNlOiBwcmUtd3JhcDtcbn1cblxuW2NvbnRlbnRlZGl0YWJsZV06Zm9jdXMge1xuICBib3JkZXItY29sb3I6IGJsdWU7XG59XG5cbi5jbG9zZTpmb2N1cyB7XG4gIG91dGxpbmU6IG5vbmU7XG59XG5cblxuIiwiOjpuZy1kZWVwIC5zdGFmZi1ub3RlIC5tb2RhbC1kaWFsb2cge1xuICBtYXgtd2lkdGg6IDQwJTtcbiAgd2lkdGg6IDQwJTtcbn1cblxuLm1vZGFsLWhlYWRlciB7XG4gIGJhY2tncm91bmQtY29sb3I6ICM1ZmNlOTk7XG59XG5cbi5tb2RhbC10aXRsZSB7XG4gIGNvbG9yOiB3aGl0ZTtcbn1cblxuLm1vZGFsLWJvZHkge1xuICBwYWRkaW5nOiAxcmVtIDRyZW0gMXJlbSA0cmVtO1xufVxuXG4uZm9vdGVyIHtcbiAgcGFkZGluZy10b3A6IDFyZW07XG4gIHBhZGRpbmctYm90dG9tOiAyLjVyZW07XG4gIHRleHQtYWxpZ246IGNlbnRlcjtcbn1cblxuLmJ0bi1pbnNlcnQtc3RhZmYtbm90ZSB7XG4gIGJhY2tncm91bmQtY29sb3I6ICM1ZmNlOTkgIWltcG9ydGFudDtcbiAgY29sb3I6IHdoaXRlICFpbXBvcnRhbnQ7XG4gIGJvcmRlci1jb2xvcjogIzVmY2U5OSAhaW1wb3J0YW50O1xufVxuXG4uYnRuLWluc2VydC1zdGFmZi1ub3RlOmhvdmVyIHtcbiAgYmFja2dyb3VuZC1jb2xvcjogIzQwYzQ4NSAhaW1wb3J0YW50O1xuICBib3JkZXItY29sb3I6ICM0MGM0ODUgIWltcG9ydGFudDtcbn1cblxuLmJ0bi1jYW5jZWwge1xuICBjb2xvcjogIzVmY2U5OSAhaW1wb3J0YW50O1xuICBib3JkZXItY29sb3I6ICM1ZmNlOTkgIWltcG9ydGFudDtcbiAgbWFyZ2luLXJpZ2h0OiAxcmVtO1xufVxuXG4uYnRuLWNhbmNlbDpob3ZlciB7XG4gIGJhY2tncm91bmQtY29sb3I6ICM1ZmNlOTkgIWltcG9ydGFudDtcbiAgY29sb3I6IHdoaXRlICFpbXBvcnRhbnQ7XG59XG5cbi5kZXNjIHtcbiAgbWFyZ2luLWJvdHRvbTogMS41cmVtO1xufVxuXG4ubm90ZSB7XG4gIGp1c3RpZnktY29udGVudDogY2VudGVyO1xufVxuXG4ubWF0LWZvcm0tZmllbGQge1xuICB3aWR0aDogMTAwJTtcbn1cblxucCB7XG4gIGZvbnQtZmFtaWx5OiBMYXRvO1xufVxuXG5bY29udGVudGVkaXRhYmxlXSB7XG4gIGJvcmRlcjogMXB4IHNvbGlkIGJsYWNrO1xuICBwYWRkaW5nOiAxNnB4O1xuICBvdXRsaW5lOiAwO1xuICBsaW5lLWhlaWdodDogMzBweDtcbiAgaGVpZ2h0OiAzMDBweDtcbiAgb3ZlcmZsb3cteTogYXV0bztcbiAgd2hpdGUtc3BhY2U6IHByZS13cmFwO1xufVxuXG5bY29udGVudGVkaXRhYmxlXTpmb2N1cyB7XG4gIGJvcmRlci1jb2xvcjogYmx1ZTtcbn1cblxuLmNsb3NlOmZvY3VzIHtcbiAgb3V0bGluZTogbm9uZTtcbn0iXX0= */");

/***/ }),

/***/ "./src/app/sign-up-sheet/staff-note/staff-note.component.ts":
/*!******************************************************************!*\
  !*** ./src/app/sign-up-sheet/staff-note/staff-note.component.ts ***!
  \******************************************************************/
/*! exports provided: StaffNoteComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "StaffNoteComponent", function() { return StaffNoteComponent; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/__ivy_ngcc__/fesm2015/core.js");
/* harmony import */ var _ng_bootstrap_ng_bootstrap__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @ng-bootstrap/ng-bootstrap */ "./node_modules/@ng-bootstrap/ng-bootstrap/__ivy_ngcc__/fesm2015/ng-bootstrap.js");
var __decorate = (undefined && undefined.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (undefined && undefined.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __importDefault = (undefined && undefined.__importDefault) || function (mod) {
  return (mod && mod.__esModule) ? mod : { "default": mod };
};


let StaffNoteComponent = class StaffNoteComponent {
    constructor(modalService) {
        this.modalService = modalService;
        this.insertStaffNote = new _angular_core__WEBPACK_IMPORTED_MODULE_0__["EventEmitter"]();
        this.touched = false;
    }
    ngOnInit() {
        this.currentStaffNote = this.staffNote ? this.staffNote : '';
    }
    open(content) {
        this.modalReference = this.modalService.open(content, { ariaLabelledBy: 'modal-basic-title',
            size: 'sm',
            windowClass: 'staff-note',
            centered: true });
    }
    onSubmit() {
        this.insertStaffNote.emit(this.currentStaffNote);
        this.modalReference.close();
        this.touched = false;
    }
    close() {
        this.touched = false;
        this.currentStaffNote = this.staffNote ? this.staffNote : '';
    }
    touch() {
        this.touched = true;
    }
};
StaffNoteComponent.ctorParameters = () => [
    { type: _ng_bootstrap_ng_bootstrap__WEBPACK_IMPORTED_MODULE_1__["NgbModal"] }
];
__decorate([
    Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["Input"])(),
    __metadata("design:type", String)
], StaffNoteComponent.prototype, "firstName", void 0);
__decorate([
    Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["Input"])(),
    __metadata("design:type", String)
], StaffNoteComponent.prototype, "lastName", void 0);
__decorate([
    Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["Input"])(),
    __metadata("design:type", String)
], StaffNoteComponent.prototype, "eventType", void 0);
__decorate([
    Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["Input"])(),
    __metadata("design:type", String)
], StaffNoteComponent.prototype, "date", void 0);
__decorate([
    Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["Input"])(),
    __metadata("design:type", String)
], StaffNoteComponent.prototype, "staffNote", void 0);
__decorate([
    Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["Output"])(),
    __metadata("design:type", _angular_core__WEBPACK_IMPORTED_MODULE_0__["EventEmitter"])
], StaffNoteComponent.prototype, "insertStaffNote", void 0);
StaffNoteComponent = __decorate([
    Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["Component"])({
        selector: 'app-staff-note',
        template: __importDefault(__webpack_require__(/*! raw-loader!./staff-note.component.html */ "./node_modules/raw-loader/dist/cjs.js!./src/app/sign-up-sheet/staff-note/staff-note.component.html")).default,
        styles: [__importDefault(__webpack_require__(/*! ./staff-note.component.scss */ "./src/app/sign-up-sheet/staff-note/staff-note.component.scss")).default]
    }),
    __metadata("design:paramtypes", [_ng_bootstrap_ng_bootstrap__WEBPACK_IMPORTED_MODULE_1__["NgbModal"]])
], StaffNoteComponent);



/***/ }),

/***/ "./src/app/slider/slider.component.scss":
/*!**********************************************!*\
  !*** ./src/app/slider/slider.component.scss ***!
  \**********************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony default export */ __webpack_exports__["default"] = (":host {\n  display: block;\n  overflow: hidden;\n  /* Hide everything that doesn't fit compoennt */\n}\n\n.panes {\n  height: 100%;\n  width: 300%;\n  /* Make the parent element to take up twice\n     of the component's width */\n  display: flex;\n  /* Align all children in a row */\n  /* Evenly divide width between children */\n}\n\n.panes div {\n  flex: 1;\n}\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi9Vc2Vycy9iZW5qYW1pbmVtaWxpYW5pL1NhbnRyb3BvbHJvdWxhbnQvYW5ndWxhci1lbGVjdHJvbi9zcmMvYXBwL3NsaWRlci9zbGlkZXIuY29tcG9uZW50LnNjc3MiLCJzcmMvYXBwL3NsaWRlci9zbGlkZXIuY29tcG9uZW50LnNjc3MiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUE7RUFDRSxjQUFBO0VBQ0EsZ0JBQUE7RUFBa0IsK0NBQUE7QUNFcEI7O0FEQUE7RUFDRSxZQUFBO0VBQ0EsV0FBQTtFQUFrQjsrQkFBQTtFQUVsQixhQUFBO0VBQWtCLGdDQUFBO0VBQ0EseUNBQUE7QUNLcEI7O0FETEU7RUFBTSxPQUFBO0FDUVIiLCJmaWxlIjoic3JjL2FwcC9zbGlkZXIvc2xpZGVyLmNvbXBvbmVudC5zY3NzIiwic291cmNlc0NvbnRlbnQiOlsiOmhvc3Qge1xuICBkaXNwbGF5OiBibG9jaztcbiAgb3ZlcmZsb3c6IGhpZGRlbjsgLyogSGlkZSBldmVyeXRoaW5nIHRoYXQgZG9lc24ndCBmaXQgY29tcG9lbm50ICovXG59XG4ucGFuZXMge1xuICBoZWlnaHQ6IDEwMCU7XG4gIHdpZHRoOiAzMDAlOyAgICAgIC8qIE1ha2UgdGhlIHBhcmVudCBlbGVtZW50IHRvIHRha2UgdXAgdHdpY2VcbiAgICAgICAgICAgICAgICAgICAgICAgb2YgdGhlIGNvbXBvbmVudCdzIHdpZHRoICovXG4gIGRpc3BsYXk6IGZsZXg7ICAgIC8qIEFsaWduIGFsbCBjaGlsZHJlbiBpbiBhIHJvdyAqL1xuICBkaXYgeyBmbGV4OiAxOyB9ICAvKiBFdmVubHkgZGl2aWRlIHdpZHRoIGJldHdlZW4gY2hpbGRyZW4gKi9cbn1cbiIsIjpob3N0IHtcbiAgZGlzcGxheTogYmxvY2s7XG4gIG92ZXJmbG93OiBoaWRkZW47XG4gIC8qIEhpZGUgZXZlcnl0aGluZyB0aGF0IGRvZXNuJ3QgZml0IGNvbXBvZW5udCAqL1xufVxuXG4ucGFuZXMge1xuICBoZWlnaHQ6IDEwMCU7XG4gIHdpZHRoOiAzMDAlO1xuICAvKiBNYWtlIHRoZSBwYXJlbnQgZWxlbWVudCB0byB0YWtlIHVwIHR3aWNlXG4gICAgIG9mIHRoZSBjb21wb25lbnQncyB3aWR0aCAqL1xuICBkaXNwbGF5OiBmbGV4O1xuICAvKiBBbGlnbiBhbGwgY2hpbGRyZW4gaW4gYSByb3cgKi9cbiAgLyogRXZlbmx5IGRpdmlkZSB3aWR0aCBiZXR3ZWVuIGNoaWxkcmVuICovXG59XG4ucGFuZXMgZGl2IHtcbiAgZmxleDogMTtcbn0iXX0= */");

/***/ }),

/***/ "./src/app/slider/slider.component.ts":
/*!********************************************!*\
  !*** ./src/app/slider/slider.component.ts ***!
  \********************************************/
/*! exports provided: SliderComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "SliderComponent", function() { return SliderComponent; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/__ivy_ngcc__/fesm2015/core.js");
/* harmony import */ var _angular_animations__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/animations */ "./node_modules/@angular/animations/__ivy_ngcc__/fesm2015/animations.js");
var __decorate = (undefined && undefined.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (undefined && undefined.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __importDefault = (undefined && undefined.__importDefault) || function (mod) {
  return (mod && mod.__esModule) ? mod : { "default": mod };
};


let SliderComponent = class SliderComponent {
    constructor() {
        this.activePane = 'third';
    }
};
__decorate([
    Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["Input"])(),
    __metadata("design:type", String)
], SliderComponent.prototype, "activePane", void 0);
SliderComponent = __decorate([
    Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["Component"])({
        selector: 'app-slider',
        template: __importDefault(__webpack_require__(/*! raw-loader!./slider.component.html */ "./node_modules/raw-loader/dist/cjs.js!./src/app/slider/slider.component.html")).default,
        animations: [
            Object(_angular_animations__WEBPACK_IMPORTED_MODULE_1__["trigger"])('slide', [
                Object(_angular_animations__WEBPACK_IMPORTED_MODULE_1__["state"])('first', Object(_angular_animations__WEBPACK_IMPORTED_MODULE_1__["style"])({ transform: 'translateX(0)' })),
                Object(_angular_animations__WEBPACK_IMPORTED_MODULE_1__["state"])('second', Object(_angular_animations__WEBPACK_IMPORTED_MODULE_1__["style"])({ transform: 'translateX(-33.33%)' })),
                Object(_angular_animations__WEBPACK_IMPORTED_MODULE_1__["state"])('third', Object(_angular_animations__WEBPACK_IMPORTED_MODULE_1__["style"])({ transform: 'translateX(-66.666%)' })),
                Object(_angular_animations__WEBPACK_IMPORTED_MODULE_1__["transition"])('* => *', Object(_angular_animations__WEBPACK_IMPORTED_MODULE_1__["animate"])(300))
            ])
        ],
        styles: [__importDefault(__webpack_require__(/*! ./slider.component.scss */ "./src/app/slider/slider.component.scss")).default]
    })
], SliderComponent);



/***/ }),

/***/ "./src/app/toolbar/notifications/notifications.component.scss":
/*!********************************************************************!*\
  !*** ./src/app/toolbar/notifications/notifications.component.scss ***!
  \********************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony default export */ __webpack_exports__["default"] = (".notification-menu {\n  outline: none;\n}\n\n.notification-header {\n  padding: 10px;\n  color: white;\n  background-color: #5fce99;\n  position: sticky;\n  position: -webkit-sticky;\n  /* For macOS/iOS Safari */\n  top: 0;\n  /* Sets the sticky toolbar to be on top */\n  z-index: 1000;\n  /* Ensure that your app's content doesn't overlap the toolbar */\n}\n\n.label {\n  display: inline-block;\n  width: 90%;\n  text-align: left;\n  font-weight: 500;\n  margin-left: 0.3rem;\n}\n\n::ng-deep.mat-menu-content {\n  padding-top: 0px !important;\n  padding-bottom: 0px !important;\n}\n\n::ng-deep.mat-menu-panel {\n  max-height: calc(100vh - 90px) !important;\n  max-width: 350px !important;\n  overflow-x: hidden !important;\n}\n\n.mat-list-base .mat-list-option {\n  font-size: 14px;\n  color: #565454;\n}\n\n.msg, .no-notifications {\n  font-size: 14px;\n  color: #565454;\n}\n\n::ng-deep.mat-pseudo-checkbox-checked {\n  background: #5fce99 !important;\n}\n\n::ng-deep.cdk-overlay-transparent-backdrop, .cdk-overlay-transparent-backdrop.cdk-overlay-backdrop-showing {\n  background-color: #212529 !important;\n  opacity: 0.5 !important;\n}\n\nmat-list-option[isRead=false] {\n  background-color: #d6ede3;\n}\n\nmat-list-option[isRead=true] {\n  background-color: #efefefd9;\n}\n\n.no-notifications {\n  padding: 1rem 7.5rem;\n  background-color: #efefefd9;\n}\n\nmat-selection-list {\n  padding-top: 0;\n}\n\n::ng-deep mat-list-base .mat-list-item, .mat-list-base .mat-list-option {\n  padding: 0.5rem 0 !important;\n  margin: 0.2rem !important;\n  height: 100% !important;\n}\n\n.fa-circle {\n  color: #f24a5a;\n  padding: 0;\n  padding-top: 10px;\n}\n\n.mark-all-as-read {\n  text-align: right;\n  cursor: pointer;\n  padding-right: 0;\n  font-size: 14px;\n}\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi9Vc2Vycy9iZW5qYW1pbmVtaWxpYW5pL1NhbnRyb3BvbHJvdWxhbnQvYW5ndWxhci1lbGVjdHJvbi9zcmMvYXBwL3Rvb2xiYXIvbm90aWZpY2F0aW9ucy9ub3RpZmljYXRpb25zLmNvbXBvbmVudC5zY3NzIiwic3JjL2FwcC90b29sYmFyL25vdGlmaWNhdGlvbnMvbm90aWZpY2F0aW9ucy5jb21wb25lbnQuc2NzcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQTtFQUNFLGFBQUE7QUNDRjs7QURFQTtFQUNFLGFBQUE7RUFDQSxZQUFBO0VBQ0EseUJBQUE7RUFDQSxnQkFBQTtFQUNBLHdCQUFBO0VBQTBCLHlCQUFBO0VBQzFCLE1BQUE7RUFBUSx5Q0FBQTtFQUNSLGFBQUE7RUFBZSwrREFBQTtBQ0lqQjs7QUREQTtFQUNFLHFCQUFBO0VBQ0EsVUFBQTtFQUNBLGdCQUFBO0VBQ0EsZ0JBQUE7RUFDQSxtQkFBQTtBQ0lGOztBRERBO0VBQ0UsMkJBQUE7RUFDQSw4QkFBQTtBQ0lGOztBRERBO0VBQ0UseUNBQUE7RUFDQSwyQkFBQTtFQUNBLDZCQUFBO0FDSUY7O0FEREE7RUFDRSxlQUFBO0VBQ0EsY0FBQTtBQ0lGOztBRERBO0VBQ0UsZUFBQTtFQUNBLGNBQUE7QUNJRjs7QUREQTtFQUNJLDhCQUFBO0FDSUo7O0FEREE7RUFDRSxvQ0FBQTtFQUNBLHVCQUFBO0FDSUY7O0FEREE7RUFDRSx5QkFBQTtBQ0lGOztBRERBO0VBQ0UsMkJBQUE7QUNJRjs7QUREQTtFQUNFLG9CQUFBO0VBQ0EsMkJBQUE7QUNJRjs7QUREQTtFQUNFLGNBQUE7QUNJRjs7QUREQTtFQUNFLDRCQUFBO0VBQ0EseUJBQUE7RUFDQSx1QkFBQTtBQ0lGOztBRERBO0VBQ0UsY0FBQTtFQUNBLFVBQUE7RUFDQSxpQkFBQTtBQ0lGOztBRERBO0VBQ0UsaUJBQUE7RUFDQSxlQUFBO0VBQ0EsZ0JBQUE7RUFDQSxlQUFBO0FDSUYiLCJmaWxlIjoic3JjL2FwcC90b29sYmFyL25vdGlmaWNhdGlvbnMvbm90aWZpY2F0aW9ucy5jb21wb25lbnQuc2NzcyIsInNvdXJjZXNDb250ZW50IjpbIi5ub3RpZmljYXRpb24tbWVudSB7XG4gIG91dGxpbmU6IG5vbmU7XG59XG5cbi5ub3RpZmljYXRpb24taGVhZGVyIHtcbiAgcGFkZGluZzogMTBweDtcbiAgY29sb3I6IHdoaXRlO1xuICBiYWNrZ3JvdW5kLWNvbG9yOiAjNWZjZTk5O1xuICBwb3NpdGlvbjogc3RpY2t5O1xuICBwb3NpdGlvbjogLXdlYmtpdC1zdGlja3k7IC8qIEZvciBtYWNPUy9pT1MgU2FmYXJpICovXG4gIHRvcDogMDsgLyogU2V0cyB0aGUgc3RpY2t5IHRvb2xiYXIgdG8gYmUgb24gdG9wICovXG4gIHotaW5kZXg6IDEwMDA7IC8qIEVuc3VyZSB0aGF0IHlvdXIgYXBwJ3MgY29udGVudCBkb2Vzbid0IG92ZXJsYXAgdGhlIHRvb2xiYXIgKi9cbn1cblxuLmxhYmVsIHtcbiAgZGlzcGxheTogaW5saW5lLWJsb2NrO1xuICB3aWR0aDogOTAlO1xuICB0ZXh0LWFsaWduOiBsZWZ0O1xuICBmb250LXdlaWdodDogNTAwO1xuICBtYXJnaW4tbGVmdDogMC4zcmVtO1xufVxuXG46Om5nLWRlZXAubWF0LW1lbnUtY29udGVudCB7XG4gIHBhZGRpbmctdG9wOiAwcHggIWltcG9ydGFudDtcbiAgcGFkZGluZy1ib3R0b206IDBweCAhaW1wb3J0YW50O1xufVxuXG46Om5nLWRlZXAubWF0LW1lbnUtcGFuZWwge1xuICBtYXgtaGVpZ2h0OiBjYWxjKDEwMHZoIC0gOTBweCkgIWltcG9ydGFudDtcbiAgbWF4LXdpZHRoOiAzNTBweCAhaW1wb3J0YW50O1xuICBvdmVyZmxvdy14OiBoaWRkZW4gIWltcG9ydGFudDtcbn1cblxuLm1hdC1saXN0LWJhc2UgLm1hdC1saXN0LW9wdGlvbiB7XG4gIGZvbnQtc2l6ZTogMTRweDtcbiAgY29sb3I6ICM1NjU0NTQ7XG59XG5cbi5tc2csIC5uby1ub3RpZmljYXRpb25zIHtcbiAgZm9udC1zaXplOiAxNHB4O1xuICBjb2xvcjogIzU2NTQ1NDtcbn1cblxuOjpuZy1kZWVwLm1hdC1wc2V1ZG8tY2hlY2tib3gtY2hlY2tlZCB7XG4gICAgYmFja2dyb3VuZDogIzVmY2U5OSAhaW1wb3J0YW50O1xufVxuXG46Om5nLWRlZXAuY2RrLW92ZXJsYXktdHJhbnNwYXJlbnQtYmFja2Ryb3AsIC5jZGstb3ZlcmxheS10cmFuc3BhcmVudC1iYWNrZHJvcC5jZGstb3ZlcmxheS1iYWNrZHJvcC1zaG93aW5nIHtcbiAgYmFja2dyb3VuZC1jb2xvcjogIzIxMjUyOSAhaW1wb3J0YW50O1xuICBvcGFjaXR5OiAwLjUgIWltcG9ydGFudDtcbn1cblxubWF0LWxpc3Qtb3B0aW9uW2lzUmVhZD0nZmFsc2UnXSB7XG4gIGJhY2tncm91bmQtY29sb3I6ICNkNmVkZTM7XG59XG5cbm1hdC1saXN0LW9wdGlvbltpc1JlYWQ9J3RydWUnXSB7XG4gIGJhY2tncm91bmQtY29sb3I6ICNlZmVmZWZkOTtcbn1cblxuLm5vLW5vdGlmaWNhdGlvbnMge1xuICBwYWRkaW5nOiAxcmVtIDcuNXJlbTtcbiAgYmFja2dyb3VuZC1jb2xvcjogI2VmZWZlZmQ5O1xufVxuXG5tYXQtc2VsZWN0aW9uLWxpc3Qge1xuICBwYWRkaW5nLXRvcDogMDtcbn1cblxuOjpuZy1kZWVwIG1hdC1saXN0LWJhc2UgLm1hdC1saXN0LWl0ZW0sIC5tYXQtbGlzdC1iYXNlIC5tYXQtbGlzdC1vcHRpb24ge1xuICBwYWRkaW5nOiAwLjVyZW0gMCAhaW1wb3J0YW50O1xuICBtYXJnaW46IDAuMnJlbSAhaW1wb3J0YW50O1xuICBoZWlnaHQ6IDEwMCUgIWltcG9ydGFudDtcbn1cblxuLmZhLWNpcmNsZSB7XG4gIGNvbG9yOiAjZjI0YTVhO1xuICBwYWRkaW5nOiAwO1xuICBwYWRkaW5nLXRvcDogMTBweDtcbn1cblxuLm1hcmstYWxsLWFzLXJlYWQge1xuICB0ZXh0LWFsaWduOiByaWdodDtcbiAgY3Vyc29yOiBwb2ludGVyO1xuICBwYWRkaW5nLXJpZ2h0OiAwO1xuICBmb250LXNpemU6IDE0cHg7XG59XG4iLCIubm90aWZpY2F0aW9uLW1lbnUge1xuICBvdXRsaW5lOiBub25lO1xufVxuXG4ubm90aWZpY2F0aW9uLWhlYWRlciB7XG4gIHBhZGRpbmc6IDEwcHg7XG4gIGNvbG9yOiB3aGl0ZTtcbiAgYmFja2dyb3VuZC1jb2xvcjogIzVmY2U5OTtcbiAgcG9zaXRpb246IHN0aWNreTtcbiAgcG9zaXRpb246IC13ZWJraXQtc3RpY2t5O1xuICAvKiBGb3IgbWFjT1MvaU9TIFNhZmFyaSAqL1xuICB0b3A6IDA7XG4gIC8qIFNldHMgdGhlIHN0aWNreSB0b29sYmFyIHRvIGJlIG9uIHRvcCAqL1xuICB6LWluZGV4OiAxMDAwO1xuICAvKiBFbnN1cmUgdGhhdCB5b3VyIGFwcCdzIGNvbnRlbnQgZG9lc24ndCBvdmVybGFwIHRoZSB0b29sYmFyICovXG59XG5cbi5sYWJlbCB7XG4gIGRpc3BsYXk6IGlubGluZS1ibG9jaztcbiAgd2lkdGg6IDkwJTtcbiAgdGV4dC1hbGlnbjogbGVmdDtcbiAgZm9udC13ZWlnaHQ6IDUwMDtcbiAgbWFyZ2luLWxlZnQ6IDAuM3JlbTtcbn1cblxuOjpuZy1kZWVwLm1hdC1tZW51LWNvbnRlbnQge1xuICBwYWRkaW5nLXRvcDogMHB4ICFpbXBvcnRhbnQ7XG4gIHBhZGRpbmctYm90dG9tOiAwcHggIWltcG9ydGFudDtcbn1cblxuOjpuZy1kZWVwLm1hdC1tZW51LXBhbmVsIHtcbiAgbWF4LWhlaWdodDogY2FsYygxMDB2aCAtIDkwcHgpICFpbXBvcnRhbnQ7XG4gIG1heC13aWR0aDogMzUwcHggIWltcG9ydGFudDtcbiAgb3ZlcmZsb3cteDogaGlkZGVuICFpbXBvcnRhbnQ7XG59XG5cbi5tYXQtbGlzdC1iYXNlIC5tYXQtbGlzdC1vcHRpb24ge1xuICBmb250LXNpemU6IDE0cHg7XG4gIGNvbG9yOiAjNTY1NDU0O1xufVxuXG4ubXNnLCAubm8tbm90aWZpY2F0aW9ucyB7XG4gIGZvbnQtc2l6ZTogMTRweDtcbiAgY29sb3I6ICM1NjU0NTQ7XG59XG5cbjo6bmctZGVlcC5tYXQtcHNldWRvLWNoZWNrYm94LWNoZWNrZWQge1xuICBiYWNrZ3JvdW5kOiAjNWZjZTk5ICFpbXBvcnRhbnQ7XG59XG5cbjo6bmctZGVlcC5jZGstb3ZlcmxheS10cmFuc3BhcmVudC1iYWNrZHJvcCwgLmNkay1vdmVybGF5LXRyYW5zcGFyZW50LWJhY2tkcm9wLmNkay1vdmVybGF5LWJhY2tkcm9wLXNob3dpbmcge1xuICBiYWNrZ3JvdW5kLWNvbG9yOiAjMjEyNTI5ICFpbXBvcnRhbnQ7XG4gIG9wYWNpdHk6IDAuNSAhaW1wb3J0YW50O1xufVxuXG5tYXQtbGlzdC1vcHRpb25baXNSZWFkPWZhbHNlXSB7XG4gIGJhY2tncm91bmQtY29sb3I6ICNkNmVkZTM7XG59XG5cbm1hdC1saXN0LW9wdGlvbltpc1JlYWQ9dHJ1ZV0ge1xuICBiYWNrZ3JvdW5kLWNvbG9yOiAjZWZlZmVmZDk7XG59XG5cbi5uby1ub3RpZmljYXRpb25zIHtcbiAgcGFkZGluZzogMXJlbSA3LjVyZW07XG4gIGJhY2tncm91bmQtY29sb3I6ICNlZmVmZWZkOTtcbn1cblxubWF0LXNlbGVjdGlvbi1saXN0IHtcbiAgcGFkZGluZy10b3A6IDA7XG59XG5cbjo6bmctZGVlcCBtYXQtbGlzdC1iYXNlIC5tYXQtbGlzdC1pdGVtLCAubWF0LWxpc3QtYmFzZSAubWF0LWxpc3Qtb3B0aW9uIHtcbiAgcGFkZGluZzogMC41cmVtIDAgIWltcG9ydGFudDtcbiAgbWFyZ2luOiAwLjJyZW0gIWltcG9ydGFudDtcbiAgaGVpZ2h0OiAxMDAlICFpbXBvcnRhbnQ7XG59XG5cbi5mYS1jaXJjbGUge1xuICBjb2xvcjogI2YyNGE1YTtcbiAgcGFkZGluZzogMDtcbiAgcGFkZGluZy10b3A6IDEwcHg7XG59XG5cbi5tYXJrLWFsbC1hcy1yZWFkIHtcbiAgdGV4dC1hbGlnbjogcmlnaHQ7XG4gIGN1cnNvcjogcG9pbnRlcjtcbiAgcGFkZGluZy1yaWdodDogMDtcbiAgZm9udC1zaXplOiAxNHB4O1xufSJdfQ== */");

/***/ }),

/***/ "./src/app/toolbar/notifications/notifications.component.ts":
/*!******************************************************************!*\
  !*** ./src/app/toolbar/notifications/notifications.component.ts ***!
  \******************************************************************/
/*! exports provided: NotificationsComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "NotificationsComponent", function() { return NotificationsComponent; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/__ivy_ngcc__/fesm2015/core.js");
/* harmony import */ var _angular_fire_database__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/fire/database */ "./node_modules/@angular/fire/__ivy_ngcc__/fesm2015/angular-fire-database.js");
var __decorate = (undefined && undefined.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (undefined && undefined.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __importDefault = (undefined && undefined.__importDefault) || function (mod) {
  return (mod && mod.__esModule) ? mod : { "default": mod };
};


let NotificationsComponent = class NotificationsComponent {
    constructor(db) {
        this.db = db;
        this.notifications = [];
        this.allRead = false;
        this.selectedNotifications = [];
    }
    ngOnInit() {
        // this.db.list('event')
        //        .stateChanges(['child_changed'])
        //        .subscribe(change => {
        //          const updated_event = {id: change.payload.key, ...(change.payload.val() as {})};
        //          this.notifications.push(this.getNotificationMsg(updated_event));
        //        });
    }
    getNotificationMsg(event) {
        let msg = '';
        if (this.isBlank(event.first_name) && this.isBlank(event.last_name)) {
            msg = 'A volunteer was removed from ' + event.event_type + ' on ' + event.event_date_txt;
        }
        else {
            msg = event.first_name + ' ' + event.last_name + ' was added to ' + event.event_type + ' on ' + event.event_date_txt;
        }
        return { 'msg': msg, 'read': false };
    }
    isBlank(str) {
        return (!str || /^\s*$/.test(str));
    }
    onNgModelChange(event) {
        for (const i in this.notifications) {
            if (this.selectedNotifications.includes(i.toString())) {
                this.notifications[i]['read'] = true;
            }
            else {
                this.notifications[i]['read'] = false;
            }
        }
    }
    blockClose($event) {
        $event.stopPropagation();
    }
    onClickOutside() {
        if (this.notificationsNotEmpty()) {
            this.notifications = this.notifications.filter(n => n.read === false);
            this.notifs.deselectAll();
        }
    }
    isRead(bool) {
        return bool;
    }
    markAllAsRead($event) {
        $event.stopPropagation();
        if (this.allRead) {
            this.notifs.deselectAll();
        }
        else {
            this.notifs.selectAll();
        }
        this.allRead = !this.allRead;
    }
    notificationsNotEmpty() {
        return this.notifications.length !== 0;
    }
};
NotificationsComponent.ctorParameters = () => [
    { type: _angular_fire_database__WEBPACK_IMPORTED_MODULE_1__["AngularFireDatabase"] }
];
__decorate([
    Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["ViewChild"])('list', { static: false }),
    __metadata("design:type", Object)
], NotificationsComponent.prototype, "notifs", void 0);
NotificationsComponent = __decorate([
    Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["Component"])({
        selector: 'app-notifications',
        template: __importDefault(__webpack_require__(/*! raw-loader!./notifications.component.html */ "./node_modules/raw-loader/dist/cjs.js!./src/app/toolbar/notifications/notifications.component.html")).default,
        styles: [__importDefault(__webpack_require__(/*! ./notifications.component.scss */ "./src/app/toolbar/notifications/notifications.component.scss")).default]
    }),
    __metadata("design:paramtypes", [_angular_fire_database__WEBPACK_IMPORTED_MODULE_1__["AngularFireDatabase"]])
], NotificationsComponent);



/***/ }),

/***/ "./src/app/toolbar/toolbar.component.scss":
/*!************************************************!*\
  !*** ./src/app/toolbar/toolbar.component.scss ***!
  \************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony default export */ __webpack_exports__["default"] = ("mat-toolbar {\n  position: sticky;\n  position: -webkit-sticky;\n  /* For macOS/iOS Safari */\n  top: 0;\n  /* Sets the sticky toolbar to be on top */\n  z-index: 1000;\n  /* Ensure that your app's content doesn't overlap the toolbar */\n}\n\na {\n  color: white;\n}\n\na:hover {\n  text-decoration: none !important;\n  color: #e4e4e2;\n}\n\n::ng-deep.cdk-overlay-transparent-backdrop, .cdk-overlay-transparent-backdrop.cdk-overlay-backdrop-showing {\n  background-color: #212529 !important;\n  opacity: 0.5 !important;\n}\n\nbutton.mat-menu-trigger.mat-icon-button.mat-button-base:hover {\n  color: #e4e4e2;\n}\n\n.menu-btn {\n  outline: none;\n}\n\n.notifications {\n  margin-right: 0.5rem;\n  vertical-align: middle;\n}\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi9Vc2Vycy9iZW5qYW1pbmVtaWxpYW5pL1NhbnRyb3BvbHJvdWxhbnQvYW5ndWxhci1lbGVjdHJvbi9zcmMvYXBwL3Rvb2xiYXIvdG9vbGJhci5jb21wb25lbnQuc2NzcyIsInNyYy9hcHAvdG9vbGJhci90b29sYmFyLmNvbXBvbmVudC5zY3NzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBO0VBQ0UsZ0JBQUE7RUFDQSx3QkFBQTtFQUEwQix5QkFBQTtFQUMxQixNQUFBO0VBQVEseUNBQUE7RUFDUixhQUFBO0VBQWUsK0RBQUE7QUNJakI7O0FERkE7RUFDRSxZQUFBO0FDS0Y7O0FERkE7RUFDRSxnQ0FBQTtFQUNBLGNBQUE7QUNLRjs7QURGQTtFQUNFLG9DQUFBO0VBQ0EsdUJBQUE7QUNLRjs7QURGQTtFQUNFLGNBQUE7QUNLRjs7QURGQTtFQUNFLGFBQUE7QUNLRjs7QURGQTtFQUNFLG9CQUFBO0VBQ0Esc0JBQUE7QUNLRiIsImZpbGUiOiJzcmMvYXBwL3Rvb2xiYXIvdG9vbGJhci5jb21wb25lbnQuc2NzcyIsInNvdXJjZXNDb250ZW50IjpbIm1hdC10b29sYmFyIHtcbiAgcG9zaXRpb246IHN0aWNreTtcbiAgcG9zaXRpb246IC13ZWJraXQtc3RpY2t5OyAvKiBGb3IgbWFjT1MvaU9TIFNhZmFyaSAqL1xuICB0b3A6IDA7IC8qIFNldHMgdGhlIHN0aWNreSB0b29sYmFyIHRvIGJlIG9uIHRvcCAqL1xuICB6LWluZGV4OiAxMDAwOyAvKiBFbnN1cmUgdGhhdCB5b3VyIGFwcCdzIGNvbnRlbnQgZG9lc24ndCBvdmVybGFwIHRoZSB0b29sYmFyICovXG59XG5hIHtcbiAgY29sb3I6IHdoaXRlO1xufVxuXG5hOmhvdmVye1xuICB0ZXh0LWRlY29yYXRpb246IG5vbmUgIWltcG9ydGFudDtcbiAgY29sb3I6ICNlNGU0ZTJcbn1cblxuOjpuZy1kZWVwLmNkay1vdmVybGF5LXRyYW5zcGFyZW50LWJhY2tkcm9wLCAuY2RrLW92ZXJsYXktdHJhbnNwYXJlbnQtYmFja2Ryb3AuY2RrLW92ZXJsYXktYmFja2Ryb3Atc2hvd2luZyB7XG4gIGJhY2tncm91bmQtY29sb3I6ICMyMTI1MjkgIWltcG9ydGFudDtcbiAgb3BhY2l0eTogMC41ICFpbXBvcnRhbnQ7XG59XG5cbmJ1dHRvbi5tYXQtbWVudS10cmlnZ2VyLm1hdC1pY29uLWJ1dHRvbi5tYXQtYnV0dG9uLWJhc2U6aG92ZXIge1xuICBjb2xvcjogI2U0ZTRlMlxufVxuXG4ubWVudS1idG4ge1xuICBvdXRsaW5lOiBub25lO1xufVxuXG4ubm90aWZpY2F0aW9ucyB7XG4gIG1hcmdpbi1yaWdodDogMC41cmVtO1xuICB2ZXJ0aWNhbC1hbGlnbjogbWlkZGxlO1xufVxuIiwibWF0LXRvb2xiYXIge1xuICBwb3NpdGlvbjogc3RpY2t5O1xuICBwb3NpdGlvbjogLXdlYmtpdC1zdGlja3k7XG4gIC8qIEZvciBtYWNPUy9pT1MgU2FmYXJpICovXG4gIHRvcDogMDtcbiAgLyogU2V0cyB0aGUgc3RpY2t5IHRvb2xiYXIgdG8gYmUgb24gdG9wICovXG4gIHotaW5kZXg6IDEwMDA7XG4gIC8qIEVuc3VyZSB0aGF0IHlvdXIgYXBwJ3MgY29udGVudCBkb2Vzbid0IG92ZXJsYXAgdGhlIHRvb2xiYXIgKi9cbn1cblxuYSB7XG4gIGNvbG9yOiB3aGl0ZTtcbn1cblxuYTpob3ZlciB7XG4gIHRleHQtZGVjb3JhdGlvbjogbm9uZSAhaW1wb3J0YW50O1xuICBjb2xvcjogI2U0ZTRlMjtcbn1cblxuOjpuZy1kZWVwLmNkay1vdmVybGF5LXRyYW5zcGFyZW50LWJhY2tkcm9wLCAuY2RrLW92ZXJsYXktdHJhbnNwYXJlbnQtYmFja2Ryb3AuY2RrLW92ZXJsYXktYmFja2Ryb3Atc2hvd2luZyB7XG4gIGJhY2tncm91bmQtY29sb3I6ICMyMTI1MjkgIWltcG9ydGFudDtcbiAgb3BhY2l0eTogMC41ICFpbXBvcnRhbnQ7XG59XG5cbmJ1dHRvbi5tYXQtbWVudS10cmlnZ2VyLm1hdC1pY29uLWJ1dHRvbi5tYXQtYnV0dG9uLWJhc2U6aG92ZXIge1xuICBjb2xvcjogI2U0ZTRlMjtcbn1cblxuLm1lbnUtYnRuIHtcbiAgb3V0bGluZTogbm9uZTtcbn1cblxuLm5vdGlmaWNhdGlvbnMge1xuICBtYXJnaW4tcmlnaHQ6IDAuNXJlbTtcbiAgdmVydGljYWwtYWxpZ246IG1pZGRsZTtcbn0iXX0= */");

/***/ }),

/***/ "./src/app/toolbar/toolbar.component.ts":
/*!**********************************************!*\
  !*** ./src/app/toolbar/toolbar.component.ts ***!
  \**********************************************/
/*! exports provided: ToolbarComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "ToolbarComponent", function() { return ToolbarComponent; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/__ivy_ngcc__/fesm2015/core.js");
/* harmony import */ var _service_auth_service__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../service/auth.service */ "./src/app/service/auth.service.ts");
var __decorate = (undefined && undefined.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (undefined && undefined.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __importDefault = (undefined && undefined.__importDefault) || function (mod) {
  return (mod && mod.__esModule) ? mod : { "default": mod };
};


let ToolbarComponent = class ToolbarComponent {
    constructor(authService) {
        this.authService = authService;
        this.show = false;
    }
    ngOnInit() {
        this.authService.currentAuthStatus.subscribe((authStatus) => {
            if (authStatus) {
                this.show = true;
            }
            else {
                this.show = false;
            }
        });
    }
    open(menu) {
        menu.openMenu();
    }
};
ToolbarComponent.ctorParameters = () => [
    { type: _service_auth_service__WEBPACK_IMPORTED_MODULE_1__["AuthService"] }
];
ToolbarComponent = __decorate([
    Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["Component"])({
        selector: 'app-toolbar',
        template: __importDefault(__webpack_require__(/*! raw-loader!./toolbar.component.html */ "./node_modules/raw-loader/dist/cjs.js!./src/app/toolbar/toolbar.component.html")).default,
        styles: [__importDefault(__webpack_require__(/*! ./toolbar.component.scss */ "./src/app/toolbar/toolbar.component.scss")).default]
    }),
    __metadata("design:paramtypes", [_service_auth_service__WEBPACK_IMPORTED_MODULE_1__["AuthService"]])
], ToolbarComponent);



/***/ }),

/***/ "./src/app/user-event/user-event.component.scss":
/*!******************************************************!*\
  !*** ./src/app/user-event/user-event.component.scss ***!
  \******************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony default export */ __webpack_exports__["default"] = ("@charset \"UTF-8\";\n#no_event {\n  display: flex;\n  justify-content: center;\n  margin-top: 100px;\n  margin-bottom: 100px;\n}\nh4 {\n  margin: 0;\n  display: block;\n  float: left;\n  padding-right: 30px;\n}\nh5 {\n  color: red;\n  margin-top: 40px;\n}\n.mat-icon {\n  vertical-align: middle;\n  margin-left: 8px;\n  margin-right: 12px;\n}\n#title {\n  font-size: 200px;\n}\ntd {\n  font-size: 15px;\n}\ntr {\n  white-space: pre;\n}\n.profile {\n  width: 60vw;\n  position: relative;\n  margin-top: 2vh;\n  left: 50%;\n  transform: translate(-50%, 0);\n}\n#colored {\n  background-color: lightgray;\n}\nbutton {\n  border-radius: 10px;\n}\n#historyBtn {\n  width: 10vw;\n  float: right;\n  text-align: center;\n  font-size: 1.1vw;\n  color: white;\n  background-color: #449afe;\n  border-bottom-right-radius: 0px;\n  border-bottom-left-radius: 0px;\n}\n.editBtn {\n  margin-top: -50px;\n  position: relative;\n}\n#editBtn {\n  width: 10vw;\n  float: right;\n  text-align: center;\n  font-size: 1.1vw;\n  margin-right: 5px;\n  color: white;\n  background-color: #449afe;\n  border-bottom-right-radius: 0px;\n  border-bottom-left-radius: 0px;\n}\n#saveBtn {\n  width: 18%;\n  float: right;\n  text-align: center;\n  font-size: 1.25vw;\n  color: white;\n  background-color: #5fce99;\n  position: absolute;\n  margin-left: 82%;\n  margin-top: 480px;\n  transition: all 0.5s;\n}\n.button span {\n  cursor: pointer;\n  display: inline-block;\n  position: relative;\n  transition: 0.5s;\n}\n.button span:after {\n  content: \"»\";\n  position: absolute;\n  opacity: 0;\n  top: 0;\n  right: -20px;\n  transition: 0.5s;\n}\n.button:hover span {\n  padding-right: 25px;\n}\n.button:hover span:after {\n  opacity: 1;\n  right: 0;\n}\n.input-group {\n  position: fixed;\n  top: 248px;\n  left: 300px;\n  width: 40vw;\n  min-width: 100px;\n}\n.group2 {\n  top: 398px;\n}\ninput {\n  font-size: 15px;\n}\n::-moz-placeholder {\n  font-size: 12px;\n}\n:-ms-input-placeholder {\n  font-size: 12px;\n}\n::-ms-input-placeholder {\n  font-size: 12px;\n}\n::placeholder {\n  font-size: 12px;\n}\n#editInput1 {\n  width: 16vw;\n  position: fixed;\n  top: 200px;\n  left: 300px;\n  border: 1px solid lightgray;\n}\n#editInput2 {\n  width: 6vw;\n  border: 1px solid lightgray;\n}\n#editInput3 {\n  width: 10vw;\n  border: 1px solid lightgray;\n}\n#editInput4 {\n  width: 10vw;\n  border: 1px solid lightgray;\n}\n#editInput5 {\n  width: 7vw;\n  border: 1px solid lightgray;\n}\n#editDate {\n  width: 170px;\n  position: fixed;\n  top: 300px;\n  left: 300px;\n}\n#picker {\n  position: fixed;\n  top: 293.5px;\n  left: 420px;\n}\n#editInput6 {\n  width: 170px;\n  position: fixed;\n  top: 348px;\n  left: 300px;\n  border: 1px solid lightgray;\n}\n#editInput7 {\n  width: 12vw;\n  border: 1px solid lightgray;\n}\n#editInput8 {\n  width: 12vw;\n  border: 1px solid lightgray;\n}\n#editInput9 {\n  width: 170px;\n  position: fixed;\n  top: 449px;\n  left: 300px;\n  border: 1px solid lightgray;\n}\npre {\n  display: inline;\n  font-family: inherit;\n  font-size: 15px;\n}\ntext {\n  margin-left: 1vw;\n  position: absolute;\n  left: 300px;\n}\ninput.ng-invalid {\n  border: 2px red solid !important;\n}\n#scrollable-area {\n  width: 53.8vw;\n  height: 194px;\n  border: 1px solid #ccc;\n  overflow-y: scroll;\n  margin-bottom: 10px;\n}\nstatus {\n  font-size: 11px;\n  font-style: italic;\n  text-align: center;\n  margin-top: 65px;\n  padding-left: 10px;\n  vertical-align: center;\n}\ninput.apple-switch {\n  position: relative;\n  -webkit-appearance: none;\n  outline: none;\n  width: 47px;\n  height: 27px;\n  background-color: #fff;\n  border: 1px solid #D9DADC;\n  border-radius: 50px;\n  box-shadow: inset -20px 0 0 0 #fff;\n  transform: scale(0.88);\n  margin-bottom: -12px;\n}\ninput.apple-switch:after {\n  content: \"\";\n  position: absolute;\n  top: 1px;\n  left: 1px;\n  background: transparent;\n  width: 24px;\n  height: 24px;\n  border-radius: 50%;\n  box-shadow: 2px 4px 6px rgba(0, 0, 0, 0.2);\n}\ninput.apple-switch:checked {\n  box-shadow: inset 20px 0 0 0 #4ed164;\n  border-color: #4ed164;\n}\ninput.apple-switch:checked:after {\n  left: 20px;\n  box-shadow: -2px 4px 3px rgba(0, 0, 0, 0.05);\n}\n.removeVolBtn {\n  transform: scale(0.7);\n}\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInNyYy9hcHAvdXNlci1ldmVudC91c2VyLWV2ZW50LmNvbXBvbmVudC5zY3NzIiwiL1VzZXJzL2JlbmphbWluZW1pbGlhbmkvU2FudHJvcG9scm91bGFudC9hbmd1bGFyLWVsZWN0cm9uL3NyYy9hcHAvdXNlci1ldmVudC91c2VyLWV2ZW50LmNvbXBvbmVudC5zY3NzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLGdCQUFnQjtBQ0FoQjtFQUNFLGFBQUE7RUFDQSx1QkFBQTtFQUNBLGlCQUFBO0VBQ0Esb0JBQUE7QURFRjtBQ0NBO0VBQ0UsU0FBQTtFQUNBLGNBQUE7RUFDQSxXQUFBO0VBQ0EsbUJBQUE7QURFRjtBQ0NBO0VBQ0UsVUFBQTtFQUNBLGdCQUFBO0FERUY7QUNBQTtFQUNFLHNCQUFBO0VBQ0EsZ0JBQUE7RUFDQSxrQkFBQTtBREdGO0FDQUE7RUFDRSxnQkFBQTtBREdGO0FDQUE7RUFDRSxlQUFBO0FER0Y7QUNBQTtFQUNFLGdCQUFBO0FER0Y7QUNBQTtFQUNFLFdBQUE7RUFDQSxrQkFBQTtFQUNBLGVBQUE7RUFDQSxTQUFBO0VBQ0EsNkJBQUE7QURHRjtBQ0FBO0VBQ0UsMkJBQUE7QURHRjtBQ0FBO0VBQ0UsbUJBQUE7QURHRjtBQ0FBO0VBQ0UsV0FBQTtFQUNBLFlBQUE7RUFDQSxrQkFBQTtFQUNBLGdCQUFBO0VBQ0EsWUFBQTtFQUNBLHlCQUFBO0VBQ0EsK0JBQUE7RUFDQSw4QkFBQTtBREdGO0FDQUE7RUFDRSxpQkFBQTtFQUNBLGtCQUFBO0FER0Y7QUNBQTtFQUNFLFdBQUE7RUFDQSxZQUFBO0VBQ0Esa0JBQUE7RUFDQSxnQkFBQTtFQUNBLGlCQUFBO0VBQ0EsWUFBQTtFQUNBLHlCQUFBO0VBQ0EsK0JBQUE7RUFDQSw4QkFBQTtBREdGO0FDQUE7RUFDRSxVQUFBO0VBQ0EsWUFBQTtFQUNBLGtCQUFBO0VBQ0EsaUJBQUE7RUFDQSxZQUFBO0VBQ0EseUJBQUE7RUFDQSxrQkFBQTtFQUNBLGdCQUFBO0VBQ0EsaUJBQUE7RUFDQSxvQkFBQTtBREdGO0FDQUE7RUFDRSxlQUFBO0VBQ0EscUJBQUE7RUFDQSxrQkFBQTtFQUNBLGdCQUFBO0FER0Y7QUNBQTtFQUNFLFlBQUE7RUFDQSxrQkFBQTtFQUNBLFVBQUE7RUFDQSxNQUFBO0VBQ0EsWUFBQTtFQUNBLGdCQUFBO0FER0Y7QUNBQTtFQUNFLG1CQUFBO0FER0Y7QUNBQTtFQUNFLFVBQUE7RUFDQSxRQUFBO0FER0Y7QUNBQTtFQUNFLGVBQUE7RUFDQSxVQUFBO0VBQ0EsV0FBQTtFQUNBLFdBQUE7RUFDQSxnQkFBQTtBREdGO0FDQ0E7RUFDRSxVQUFBO0FERUY7QUNDQTtFQUNFLGVBQUE7QURFRjtBQ0FBO0VBQ0UsZUFBQTtBREdGO0FDSkE7RUFDRSxlQUFBO0FER0Y7QUNKQTtFQUNFLGVBQUE7QURHRjtBQ0pBO0VBQ0UsZUFBQTtBREdGO0FDREE7RUFDRSxXQUFBO0VBQ0EsZUFBQTtFQUNBLFVBQUE7RUFDQSxXQUFBO0VBQ0EsMkJBQUE7QURJRjtBQ0RBO0VBQ0UsVUFBQTtFQUNBLDJCQUFBO0FESUY7QUNEQTtFQUNFLFdBQUE7RUFDQSwyQkFBQTtBRElGO0FDREE7RUFDRSxXQUFBO0VBQ0EsMkJBQUE7QURJRjtBQ0RBO0VBQ0UsVUFBQTtFQUNBLDJCQUFBO0FESUY7QUNEQTtFQUNFLFlBQUE7RUFDQSxlQUFBO0VBQ0EsVUFBQTtFQUNBLFdBQUE7QURJRjtBQ0RBO0VBQ0UsZUFBQTtFQUNBLFlBQUE7RUFDQSxXQUFBO0FESUY7QUNEQTtFQUNFLFlBQUE7RUFDQSxlQUFBO0VBQ0EsVUFBQTtFQUNBLFdBQUE7RUFDQSwyQkFBQTtBRElGO0FDREE7RUFDRSxXQUFBO0VBQ0EsMkJBQUE7QURJRjtBQ0RBO0VBQ0UsV0FBQTtFQUNBLDJCQUFBO0FESUY7QUNEQTtFQUNFLFlBQUE7RUFDQSxlQUFBO0VBQ0EsVUFBQTtFQUNBLFdBQUE7RUFDQSwyQkFBQTtBRElGO0FDREE7RUFDRSxlQUFBO0VBQ0Esb0JBQUE7RUFDQSxlQUFBO0FESUY7QUNEQTtFQUNFLGdCQUFBO0VBQ0Esa0JBQUE7RUFDQSxXQUFBO0FESUY7QUNEQTtFQUNFLGdDQUFBO0FESUY7QUNEQTtFQUNFLGFBQUE7RUFDQSxhQUFBO0VBQ0Esc0JBQUE7RUFDQSxrQkFBQTtFQUNBLG1CQUFBO0FESUY7QUNEQTtFQUNFLGVBQUE7RUFDQSxrQkFBQTtFQUNBLGtCQUFBO0VBQ0EsZ0JBQUE7RUFDQSxrQkFBQTtFQUNBLHNCQUFBO0FESUY7QUNEQTtFQUNFLGtCQUFBO0VBQ0Esd0JBQUE7RUFDQSxhQUFBO0VBQ0EsV0FBQTtFQUNBLFlBQUE7RUFDQSxzQkFBQTtFQUNBLHlCQUFBO0VBQ0EsbUJBQUE7RUFDQSxrQ0FBQTtFQUNBLHNCQUFBO0VBQ0Esb0JBQUE7QURJRjtBQ0RBO0VBQ0UsV0FBQTtFQUNBLGtCQUFBO0VBQ0EsUUFBQTtFQUNBLFNBQUE7RUFDQSx1QkFBQTtFQUNBLFdBQUE7RUFDQSxZQUFBO0VBQ0Esa0JBQUE7RUFDQSwwQ0FBQTtBRElGO0FDREE7RUFDRSxvQ0FBQTtFQUNBLHFCQUFBO0FESUY7QUNEQTtFQUNFLFVBQUE7RUFDQSw0Q0FBQTtBRElGO0FDREE7RUFDRSxxQkFBQTtBRElGIiwiZmlsZSI6InNyYy9hcHAvdXNlci1ldmVudC91c2VyLWV2ZW50LmNvbXBvbmVudC5zY3NzIiwic291cmNlc0NvbnRlbnQiOlsiQGNoYXJzZXQgXCJVVEYtOFwiO1xuI25vX2V2ZW50IHtcbiAgZGlzcGxheTogZmxleDtcbiAganVzdGlmeS1jb250ZW50OiBjZW50ZXI7XG4gIG1hcmdpbi10b3A6IDEwMHB4O1xuICBtYXJnaW4tYm90dG9tOiAxMDBweDtcbn1cblxuaDQge1xuICBtYXJnaW46IDA7XG4gIGRpc3BsYXk6IGJsb2NrO1xuICBmbG9hdDogbGVmdDtcbiAgcGFkZGluZy1yaWdodDogMzBweDtcbn1cblxuaDUge1xuICBjb2xvcjogcmVkO1xuICBtYXJnaW4tdG9wOiA0MHB4O1xufVxuXG4ubWF0LWljb24ge1xuICB2ZXJ0aWNhbC1hbGlnbjogbWlkZGxlO1xuICBtYXJnaW4tbGVmdDogOHB4O1xuICBtYXJnaW4tcmlnaHQ6IDEycHg7XG59XG5cbiN0aXRsZSB7XG4gIGZvbnQtc2l6ZTogMjAwcHg7XG59XG5cbnRkIHtcbiAgZm9udC1zaXplOiAxNXB4O1xufVxuXG50ciB7XG4gIHdoaXRlLXNwYWNlOiBwcmU7XG59XG5cbi5wcm9maWxlIHtcbiAgd2lkdGg6IDYwdnc7XG4gIHBvc2l0aW9uOiByZWxhdGl2ZTtcbiAgbWFyZ2luLXRvcDogMnZoO1xuICBsZWZ0OiA1MCU7XG4gIHRyYW5zZm9ybTogdHJhbnNsYXRlKC01MCUsIDApO1xufVxuXG4jY29sb3JlZCB7XG4gIGJhY2tncm91bmQtY29sb3I6IGxpZ2h0Z3JheTtcbn1cblxuYnV0dG9uIHtcbiAgYm9yZGVyLXJhZGl1czogMTBweDtcbn1cblxuI2hpc3RvcnlCdG4ge1xuICB3aWR0aDogMTB2dztcbiAgZmxvYXQ6IHJpZ2h0O1xuICB0ZXh0LWFsaWduOiBjZW50ZXI7XG4gIGZvbnQtc2l6ZTogMS4xdnc7XG4gIGNvbG9yOiB3aGl0ZTtcbiAgYmFja2dyb3VuZC1jb2xvcjogIzQ0OWFmZTtcbiAgYm9yZGVyLWJvdHRvbS1yaWdodC1yYWRpdXM6IDBweDtcbiAgYm9yZGVyLWJvdHRvbS1sZWZ0LXJhZGl1czogMHB4O1xufVxuXG4uZWRpdEJ0biB7XG4gIG1hcmdpbi10b3A6IC01MHB4O1xuICBwb3NpdGlvbjogcmVsYXRpdmU7XG59XG5cbiNlZGl0QnRuIHtcbiAgd2lkdGg6IDEwdnc7XG4gIGZsb2F0OiByaWdodDtcbiAgdGV4dC1hbGlnbjogY2VudGVyO1xuICBmb250LXNpemU6IDEuMXZ3O1xuICBtYXJnaW4tcmlnaHQ6IDVweDtcbiAgY29sb3I6IHdoaXRlO1xuICBiYWNrZ3JvdW5kLWNvbG9yOiAjNDQ5YWZlO1xuICBib3JkZXItYm90dG9tLXJpZ2h0LXJhZGl1czogMHB4O1xuICBib3JkZXItYm90dG9tLWxlZnQtcmFkaXVzOiAwcHg7XG59XG5cbiNzYXZlQnRuIHtcbiAgd2lkdGg6IDE4JTtcbiAgZmxvYXQ6IHJpZ2h0O1xuICB0ZXh0LWFsaWduOiBjZW50ZXI7XG4gIGZvbnQtc2l6ZTogMS4yNXZ3O1xuICBjb2xvcjogd2hpdGU7XG4gIGJhY2tncm91bmQtY29sb3I6ICM1ZmNlOTk7XG4gIHBvc2l0aW9uOiBhYnNvbHV0ZTtcbiAgbWFyZ2luLWxlZnQ6IDgyJTtcbiAgbWFyZ2luLXRvcDogNDgwcHg7XG4gIHRyYW5zaXRpb246IGFsbCAwLjVzO1xufVxuXG4uYnV0dG9uIHNwYW4ge1xuICBjdXJzb3I6IHBvaW50ZXI7XG4gIGRpc3BsYXk6IGlubGluZS1ibG9jaztcbiAgcG9zaXRpb246IHJlbGF0aXZlO1xuICB0cmFuc2l0aW9uOiAwLjVzO1xufVxuXG4uYnV0dG9uIHNwYW46YWZ0ZXIge1xuICBjb250ZW50OiBcIsK7XCI7XG4gIHBvc2l0aW9uOiBhYnNvbHV0ZTtcbiAgb3BhY2l0eTogMDtcbiAgdG9wOiAwO1xuICByaWdodDogLTIwcHg7XG4gIHRyYW5zaXRpb246IDAuNXM7XG59XG5cbi5idXR0b246aG92ZXIgc3BhbiB7XG4gIHBhZGRpbmctcmlnaHQ6IDI1cHg7XG59XG5cbi5idXR0b246aG92ZXIgc3BhbjphZnRlciB7XG4gIG9wYWNpdHk6IDE7XG4gIHJpZ2h0OiAwO1xufVxuXG4uaW5wdXQtZ3JvdXAge1xuICBwb3NpdGlvbjogZml4ZWQ7XG4gIHRvcDogMjQ4cHg7XG4gIGxlZnQ6IDMwMHB4O1xuICB3aWR0aDogNDB2dztcbiAgbWluLXdpZHRoOiAxMDBweDtcbn1cblxuLmdyb3VwMiB7XG4gIHRvcDogMzk4cHg7XG59XG5cbmlucHV0IHtcbiAgZm9udC1zaXplOiAxNXB4O1xufVxuXG46OnBsYWNlaG9sZGVyIHtcbiAgZm9udC1zaXplOiAxMnB4O1xufVxuXG4jZWRpdElucHV0MSB7XG4gIHdpZHRoOiAxNnZ3O1xuICBwb3NpdGlvbjogZml4ZWQ7XG4gIHRvcDogMjAwcHg7XG4gIGxlZnQ6IDMwMHB4O1xuICBib3JkZXI6IDFweCBzb2xpZCBsaWdodGdyYXk7XG59XG5cbiNlZGl0SW5wdXQyIHtcbiAgd2lkdGg6IDZ2dztcbiAgYm9yZGVyOiAxcHggc29saWQgbGlnaHRncmF5O1xufVxuXG4jZWRpdElucHV0MyB7XG4gIHdpZHRoOiAxMHZ3O1xuICBib3JkZXI6IDFweCBzb2xpZCBsaWdodGdyYXk7XG59XG5cbiNlZGl0SW5wdXQ0IHtcbiAgd2lkdGg6IDEwdnc7XG4gIGJvcmRlcjogMXB4IHNvbGlkIGxpZ2h0Z3JheTtcbn1cblxuI2VkaXRJbnB1dDUge1xuICB3aWR0aDogN3Z3O1xuICBib3JkZXI6IDFweCBzb2xpZCBsaWdodGdyYXk7XG59XG5cbiNlZGl0RGF0ZSB7XG4gIHdpZHRoOiAxNzBweDtcbiAgcG9zaXRpb246IGZpeGVkO1xuICB0b3A6IDMwMHB4O1xuICBsZWZ0OiAzMDBweDtcbn1cblxuI3BpY2tlciB7XG4gIHBvc2l0aW9uOiBmaXhlZDtcbiAgdG9wOiAyOTMuNXB4O1xuICBsZWZ0OiA0MjBweDtcbn1cblxuI2VkaXRJbnB1dDYge1xuICB3aWR0aDogMTcwcHg7XG4gIHBvc2l0aW9uOiBmaXhlZDtcbiAgdG9wOiAzNDhweDtcbiAgbGVmdDogMzAwcHg7XG4gIGJvcmRlcjogMXB4IHNvbGlkIGxpZ2h0Z3JheTtcbn1cblxuI2VkaXRJbnB1dDcge1xuICB3aWR0aDogMTJ2dztcbiAgYm9yZGVyOiAxcHggc29saWQgbGlnaHRncmF5O1xufVxuXG4jZWRpdElucHV0OCB7XG4gIHdpZHRoOiAxMnZ3O1xuICBib3JkZXI6IDFweCBzb2xpZCBsaWdodGdyYXk7XG59XG5cbiNlZGl0SW5wdXQ5IHtcbiAgd2lkdGg6IDE3MHB4O1xuICBwb3NpdGlvbjogZml4ZWQ7XG4gIHRvcDogNDQ5cHg7XG4gIGxlZnQ6IDMwMHB4O1xuICBib3JkZXI6IDFweCBzb2xpZCBsaWdodGdyYXk7XG59XG5cbnByZSB7XG4gIGRpc3BsYXk6IGlubGluZTtcbiAgZm9udC1mYW1pbHk6IGluaGVyaXQ7XG4gIGZvbnQtc2l6ZTogMTVweDtcbn1cblxudGV4dCB7XG4gIG1hcmdpbi1sZWZ0OiAxdnc7XG4gIHBvc2l0aW9uOiBhYnNvbHV0ZTtcbiAgbGVmdDogMzAwcHg7XG59XG5cbmlucHV0Lm5nLWludmFsaWQge1xuICBib3JkZXI6IDJweCByZWQgc29saWQgIWltcG9ydGFudDtcbn1cblxuI3Njcm9sbGFibGUtYXJlYSB7XG4gIHdpZHRoOiA1My44dnc7XG4gIGhlaWdodDogMTk0cHg7XG4gIGJvcmRlcjogMXB4IHNvbGlkICNjY2M7XG4gIG92ZXJmbG93LXk6IHNjcm9sbDtcbiAgbWFyZ2luLWJvdHRvbTogMTBweDtcbn1cblxuc3RhdHVzIHtcbiAgZm9udC1zaXplOiAxMXB4O1xuICBmb250LXN0eWxlOiBpdGFsaWM7XG4gIHRleHQtYWxpZ246IGNlbnRlcjtcbiAgbWFyZ2luLXRvcDogNjVweDtcbiAgcGFkZGluZy1sZWZ0OiAxMHB4O1xuICB2ZXJ0aWNhbC1hbGlnbjogY2VudGVyO1xufVxuXG5pbnB1dC5hcHBsZS1zd2l0Y2gge1xuICBwb3NpdGlvbjogcmVsYXRpdmU7XG4gIC13ZWJraXQtYXBwZWFyYW5jZTogbm9uZTtcbiAgb3V0bGluZTogbm9uZTtcbiAgd2lkdGg6IDQ3cHg7XG4gIGhlaWdodDogMjdweDtcbiAgYmFja2dyb3VuZC1jb2xvcjogI2ZmZjtcbiAgYm9yZGVyOiAxcHggc29saWQgI0Q5REFEQztcbiAgYm9yZGVyLXJhZGl1czogNTBweDtcbiAgYm94LXNoYWRvdzogaW5zZXQgLTIwcHggMCAwIDAgI2ZmZjtcbiAgdHJhbnNmb3JtOiBzY2FsZSgwLjg4KTtcbiAgbWFyZ2luLWJvdHRvbTogLTEycHg7XG59XG5cbmlucHV0LmFwcGxlLXN3aXRjaDphZnRlciB7XG4gIGNvbnRlbnQ6IFwiXCI7XG4gIHBvc2l0aW9uOiBhYnNvbHV0ZTtcbiAgdG9wOiAxcHg7XG4gIGxlZnQ6IDFweDtcbiAgYmFja2dyb3VuZDogdHJhbnNwYXJlbnQ7XG4gIHdpZHRoOiAyNHB4O1xuICBoZWlnaHQ6IDI0cHg7XG4gIGJvcmRlci1yYWRpdXM6IDUwJTtcbiAgYm94LXNoYWRvdzogMnB4IDRweCA2cHggcmdiYSgwLCAwLCAwLCAwLjIpO1xufVxuXG5pbnB1dC5hcHBsZS1zd2l0Y2g6Y2hlY2tlZCB7XG4gIGJveC1zaGFkb3c6IGluc2V0IDIwcHggMCAwIDAgIzRlZDE2NDtcbiAgYm9yZGVyLWNvbG9yOiAjNGVkMTY0O1xufVxuXG5pbnB1dC5hcHBsZS1zd2l0Y2g6Y2hlY2tlZDphZnRlciB7XG4gIGxlZnQ6IDIwcHg7XG4gIGJveC1zaGFkb3c6IC0ycHggNHB4IDNweCByZ2JhKDAsIDAsIDAsIDAuMDUpO1xufVxuXG4ucmVtb3ZlVm9sQnRuIHtcbiAgdHJhbnNmb3JtOiBzY2FsZSgwLjcpO1xufSIsIiNub19ldmVudCB7XG4gIGRpc3BsYXk6IGZsZXg7XG4gIGp1c3RpZnktY29udGVudDogY2VudGVyO1xuICBtYXJnaW4tdG9wOiAxMDBweDtcbiAgbWFyZ2luLWJvdHRvbTogMTAwcHg7XG59XG5cbmg0IHtcbiAgbWFyZ2luOiAwO1xuICBkaXNwbGF5OiBibG9jaztcbiAgZmxvYXQ6IGxlZnQ7XG4gIHBhZGRpbmctcmlnaHQ6IDMwcHg7XG59XG5cbmg1IHtcbiAgY29sb3I6IHJlZDtcbiAgbWFyZ2luLXRvcDogNDBweDtcbn1cbi5tYXQtaWNvbiB7XG4gIHZlcnRpY2FsLWFsaWduOiBtaWRkbGU7XG4gIG1hcmdpbi1sZWZ0OiA4cHg7XG4gIG1hcmdpbi1yaWdodDogMTJweDtcbn1cblxuI3RpdGxlIHtcbiAgZm9udC1zaXplOiAyMDBweDtcbn1cblxudGQge1xuICBmb250LXNpemU6IDE1cHg7XG59XG5cbnRyIHtcbiAgd2hpdGUtc3BhY2U6IHByZTtcbn1cblxuLnByb2ZpbGUge1xuICB3aWR0aDogNjB2dztcbiAgcG9zaXRpb246IHJlbGF0aXZlOyBcbiAgbWFyZ2luLXRvcDogMnZoO1xuICBsZWZ0OiA1MCU7XG4gIHRyYW5zZm9ybTogdHJhbnNsYXRlKC01MCUsIDApO1xufVxuXG4jY29sb3JlZCB7XG4gIGJhY2tncm91bmQtY29sb3I6IGxpZ2h0Z3JheTtcbn1cblxuYnV0dG9uIHtcbiAgYm9yZGVyLXJhZGl1czogMTBweDtcbn1cblxuI2hpc3RvcnlCdG4ge1xuICB3aWR0aDogMTB2dztcbiAgZmxvYXQ6IHJpZ2h0O1xuICB0ZXh0LWFsaWduOiBjZW50ZXI7XG4gIGZvbnQtc2l6ZTogMS4xMHZ3O1xuICBjb2xvcjogd2hpdGU7XG4gIGJhY2tncm91bmQtY29sb3I6ICM0NDlhZmU7XG4gIGJvcmRlci1ib3R0b20tcmlnaHQtcmFkaXVzOiAwcHg7XG4gIGJvcmRlci1ib3R0b20tbGVmdC1yYWRpdXM6IDBweDtcbn1cblxuLmVkaXRCdG57XG4gIG1hcmdpbi10b3A6IC01MHB4O1xuICBwb3NpdGlvbjogcmVsYXRpdmU7XG59XG5cbiNlZGl0QnRuIHtcbiAgd2lkdGg6IDEwdnc7XG4gIGZsb2F0OiByaWdodDtcbiAgdGV4dC1hbGlnbjogY2VudGVyO1xuICBmb250LXNpemU6IDEuMTB2dztcbiAgbWFyZ2luLXJpZ2h0OiA1cHg7XG4gIGNvbG9yOiB3aGl0ZTtcbiAgYmFja2dyb3VuZC1jb2xvcjogIzQ0OWFmZTtcbiAgYm9yZGVyLWJvdHRvbS1yaWdodC1yYWRpdXM6IDBweDtcbiAgYm9yZGVyLWJvdHRvbS1sZWZ0LXJhZGl1czogMHB4O1xufVxuXG4jc2F2ZUJ0biB7XG4gIHdpZHRoOiAxOCU7XG4gIGZsb2F0OiByaWdodDtcbiAgdGV4dC1hbGlnbjogY2VudGVyO1xuICBmb250LXNpemU6IDEuMjV2dztcbiAgY29sb3I6IHdoaXRlO1xuICBiYWNrZ3JvdW5kLWNvbG9yOiAjNWZjZTk5O1xuICBwb3NpdGlvbjogYWJzb2x1dGU7XG4gIG1hcmdpbi1sZWZ0OiA4MiU7XG4gIG1hcmdpbi10b3A6IDQ4MHB4O1xuICB0cmFuc2l0aW9uOiBhbGwgMC41cztcbn1cblxuLmJ1dHRvbiBzcGFuIHtcbiAgY3Vyc29yOiBwb2ludGVyO1xuICBkaXNwbGF5OiBpbmxpbmUtYmxvY2s7XG4gIHBvc2l0aW9uOiByZWxhdGl2ZTtcbiAgdHJhbnNpdGlvbjogMC41cztcbn1cblxuLmJ1dHRvbiBzcGFuOmFmdGVyIHtcbiAgY29udGVudDogXCJcXDAwYmJcIjtcbiAgcG9zaXRpb246IGFic29sdXRlO1xuICBvcGFjaXR5OiAwO1xuICB0b3A6IDA7XG4gIHJpZ2h0OiAtMjBweDtcbiAgdHJhbnNpdGlvbjogMC41cztcbn1cblxuLmJ1dHRvbjpob3ZlciBzcGFuIHtcbiAgcGFkZGluZy1yaWdodDogMjVweDtcbn1cblxuLmJ1dHRvbjpob3ZlciBzcGFuOmFmdGVyIHtcbiAgb3BhY2l0eTogMTtcbiAgcmlnaHQ6IDA7XG59XG5cbi5pbnB1dC1ncm91cCB7XG4gIHBvc2l0aW9uOiBmaXhlZDtcbiAgdG9wOiAyNDhweDtcbiAgbGVmdDogMzAwcHg7XG4gIHdpZHRoOiA0MHZ3O1xuICBtaW4td2lkdGg6IDEwMHB4O1xuICBcbn1cblxuLmdyb3VwMiB7XG4gIHRvcDogMzk4cHg7XG59XG5cbmlucHV0IHtcbiAgZm9udC1zaXplOiAxNXB4O1xufVxuOjpwbGFjZWhvbGRlciB7XG4gIGZvbnQtc2l6ZTogMTJweDtcbn1cbiNlZGl0SW5wdXQxIHtcbiAgd2lkdGg6IDE2dnc7XG4gIHBvc2l0aW9uOiBmaXhlZDtcbiAgdG9wOiAyMDBweDtcbiAgbGVmdDogMzAwcHg7XG4gIGJvcmRlcjogMXB4IHNvbGlkIGxpZ2h0Z3JheTtcbn1cblxuI2VkaXRJbnB1dDIge1xuICB3aWR0aDogNnZ3O1xuICBib3JkZXI6IDFweCBzb2xpZCBsaWdodGdyYXk7XG59XG5cbiNlZGl0SW5wdXQzIHtcbiAgd2lkdGg6IDEwdnc7XG4gIGJvcmRlcjogMXB4IHNvbGlkIGxpZ2h0Z3JheTtcbn1cblxuI2VkaXRJbnB1dDQge1xuICB3aWR0aDogMTB2dztcbiAgYm9yZGVyOiAxcHggc29saWQgbGlnaHRncmF5O1xufVxuXG4jZWRpdElucHV0NSB7XG4gIHdpZHRoOiA3dnc7XG4gIGJvcmRlcjogMXB4IHNvbGlkIGxpZ2h0Z3JheTtcbn1cblxuI2VkaXREYXRlIHtcbiAgd2lkdGg6IDE3MHB4O1xuICBwb3NpdGlvbjogZml4ZWQ7XG4gIHRvcDogMzAwcHg7XG4gIGxlZnQ6IDMwMHB4O1xufVxuXG4jcGlja2VyIHtcbiAgcG9zaXRpb246IGZpeGVkO1xuICB0b3A6IDI5My41cHg7XG4gIGxlZnQ6IDQyMHB4O1xufVxuXG4jZWRpdElucHV0NiB7XG4gIHdpZHRoOiAxNzBweDtcbiAgcG9zaXRpb246IGZpeGVkO1xuICB0b3A6IDM0OHB4O1xuICBsZWZ0OiAzMDBweDtcbiAgYm9yZGVyOiAxcHggc29saWQgbGlnaHRncmF5O1xufVxuXG4jZWRpdElucHV0NyB7XG4gIHdpZHRoOiAxMnZ3O1xuICBib3JkZXI6IDFweCBzb2xpZCBsaWdodGdyYXk7XG59XG5cbiNlZGl0SW5wdXQ4IHtcbiAgd2lkdGg6IDEydnc7XG4gIGJvcmRlcjogMXB4IHNvbGlkIGxpZ2h0Z3JheTtcbn1cblxuI2VkaXRJbnB1dDkge1xuICB3aWR0aDogMTcwcHg7XG4gIHBvc2l0aW9uOiBmaXhlZDtcbiAgdG9wOiA0NDlweDtcbiAgbGVmdDogMzAwcHg7XG4gIGJvcmRlcjogMXB4IHNvbGlkIGxpZ2h0Z3JheTtcbn1cblxucHJlIHtcbiAgZGlzcGxheTogaW5saW5lO1xuICBmb250LWZhbWlseTogaW5oZXJpdDtcbiAgZm9udC1zaXplOiAxNXB4O1xufVxuXG50ZXh0IHtcbiAgbWFyZ2luLWxlZnQ6IDF2dztcbiAgcG9zaXRpb246IGFic29sdXRlO1xuICBsZWZ0OiAzMDBweDtcbn1cblxuaW5wdXQubmctaW52YWxpZCB7XG4gIGJvcmRlcjogMnB4IHJlZCBzb2xpZCAhaW1wb3J0YW50O1xufVxuXG4jc2Nyb2xsYWJsZS1hcmVhIHtcbiAgd2lkdGg6IDUzLjh2dztcbiAgaGVpZ2h0OiAxOTRweDtcbiAgYm9yZGVyOiAxcHggc29saWQgI2NjYztcbiAgb3ZlcmZsb3cteTogc2Nyb2xsOyBcbiAgbWFyZ2luLWJvdHRvbTogMTBweDtcbn1cblxuc3RhdHVzIHtcbiAgZm9udC1zaXplOiAxMXB4O1xuICBmb250LXN0eWxlOiBpdGFsaWM7XG4gIHRleHQtYWxpZ246IGNlbnRlcjtcbiAgbWFyZ2luLXRvcDogNjVweDtcbiAgcGFkZGluZy1sZWZ0OiAxMHB4O1xuICB2ZXJ0aWNhbC1hbGlnbjogY2VudGVyO1xufVxuXG5pbnB1dC5hcHBsZS1zd2l0Y2gge1xuICBwb3NpdGlvbjogcmVsYXRpdmU7XG4gIC13ZWJraXQtYXBwZWFyYW5jZTogbm9uZTtcbiAgb3V0bGluZTogbm9uZTtcbiAgd2lkdGg6IDQ3cHg7XG4gIGhlaWdodDogMjdweDtcbiAgYmFja2dyb3VuZC1jb2xvcjogI2ZmZjtcbiAgYm9yZGVyOiAxcHggc29saWQgI0Q5REFEQztcbiAgYm9yZGVyLXJhZGl1czogNTBweDtcbiAgYm94LXNoYWRvdzogaW5zZXQgLTIwcHggMCAwIDAgI2ZmZjtcbiAgdHJhbnNmb3JtOiBzY2FsZSgwLjg4KTtcbiAgbWFyZ2luLWJvdHRvbTogLTEycHg7XG59XG5cbmlucHV0LmFwcGxlLXN3aXRjaDphZnRlciB7XG4gIGNvbnRlbnQ6IFwiXCI7XG4gIHBvc2l0aW9uOiBhYnNvbHV0ZTtcbiAgdG9wOiAxcHg7XG4gIGxlZnQ6IDFweDtcbiAgYmFja2dyb3VuZDogdHJhbnNwYXJlbnQ7XG4gIHdpZHRoOiAyNHB4O1xuICBoZWlnaHQ6IDI0cHg7XG4gIGJvcmRlci1yYWRpdXM6IDUwJTtcbiAgYm94LXNoYWRvdzogMnB4IDRweCA2cHggcmdiYSgwLDAsMCwwLjIpO1xufVxuXG5pbnB1dC5hcHBsZS1zd2l0Y2g6Y2hlY2tlZCB7XG4gIGJveC1zaGFkb3c6IGluc2V0IDIwcHggMCAwIDAgIzRlZDE2NDtcbiAgYm9yZGVyLWNvbG9yOiAjNGVkMTY0O1xufVxuXG5pbnB1dC5hcHBsZS1zd2l0Y2g6Y2hlY2tlZDphZnRlciB7XG4gIGxlZnQ6IDIwcHg7XG4gIGJveC1zaGFkb3c6IC0ycHggNHB4IDNweCByZ2JhKDAsMCwwLDAuMDUpO1xufVxuXG4ucmVtb3ZlVm9sQnRue1xuICB0cmFuc2Zvcm06IHNjYWxlKDAuNyk7XG59Il19 */");

/***/ }),

/***/ "./src/app/user-event/user-event.component.ts":
/*!****************************************************!*\
  !*** ./src/app/user-event/user-event.component.ts ***!
  \****************************************************/
/*! exports provided: UserEventComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "UserEventComponent", function() { return UserEventComponent; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/__ivy_ngcc__/fesm2015/core.js");
/* harmony import */ var _ng_bootstrap_ng_bootstrap__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @ng-bootstrap/ng-bootstrap */ "./node_modules/@ng-bootstrap/ng-bootstrap/__ivy_ngcc__/fesm2015/ng-bootstrap.js");
/* harmony import */ var _angular_fire_database__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/fire/database */ "./node_modules/@angular/fire/__ivy_ngcc__/fesm2015/angular-fire-database.js");
/* harmony import */ var _firebase_service_service__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../firebase-service.service */ "./src/app/firebase-service.service.ts");
/* harmony import */ var _angular_forms__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @angular/forms */ "./node_modules/@angular/forms/__ivy_ngcc__/fesm2015/forms.js");
/* harmony import */ var _shared_models_user__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ../shared/models/user */ "./src/app/shared/models/user.ts");
var __decorate = (undefined && undefined.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (undefined && undefined.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __awaiter = (undefined && undefined.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (undefined && undefined.__importDefault) || function (mod) {
  return (mod && mod.__esModule) ? mod : { "default": mod };
};






let UserEventComponent = class UserEventComponent {
    constructor(modalService, db, firebase, formBuilder) {
        this.modalService = modalService;
        this.db = db;
        this.firebase = firebase;
        this.formBuilder = formBuilder;
        this.displayedColumns = [
            "event_data_text",
            "event_type",
            "event_time_start",
            "event_time_end",
        ];
        this.model = new _shared_models_user__WEBPACK_IMPORTED_MODULE_5__["User"]();
        this.removeUserFromEvent = new _angular_core__WEBPACK_IMPORTED_MODULE_0__["EventEmitter"]();
    }
    ngOnInit() {
        return __awaiter(this, void 0, void 0, function* () {
            this.displayForm = false;
            this.events = this.firebase.getEvents();
            this.cancelledEvents = this.firebase.getCancelledEvents();
            this.pastEvents = this.firebase.getPastEvents();
            this.firebase.getUser(this.userId).subscribe((element) => {
                this.element = element;
                this.model = element;
                this.checkBox();
            });
            this.displayCurrentEvents(this.userId);
            this.displayPastEvents(this.userId);
            this.displayCancellation(this.userId);
            var phoneNumPattern = new RegExp("^[0-9]{10}$");
            this.myForm = this.formBuilder.group({
                dob: ["", _angular_forms__WEBPACK_IMPORTED_MODULE_4__["Validators"].required],
                address_number: ["", _angular_forms__WEBPACK_IMPORTED_MODULE_4__["Validators"].required],
                address_street: ["", _angular_forms__WEBPACK_IMPORTED_MODULE_4__["Validators"].required],
                address_city: ["", _angular_forms__WEBPACK_IMPORTED_MODULE_4__["Validators"].required],
                address_postal_code: ["", _angular_forms__WEBPACK_IMPORTED_MODULE_4__["Validators"].required],
                email: ["", _angular_forms__WEBPACK_IMPORTED_MODULE_4__["Validators"].required],
                phone_number: ["", _angular_forms__WEBPACK_IMPORTED_MODULE_4__["Validators"].pattern(phoneNumPattern)],
                emergency_contact_name: ["",],
                emergency_relationship: ["",],
                emergency_contact_number: ["",],
            });
        });
    }
    capitalize(str) {
        return str.toUpperCase();
    }
    open(content) {
        this.modalReference = this.modalService.open(content, {
            ariaLabelledBy: "modal-basic-title",
            size: "lg",
        });
    }
    openEditForm() {
        this.displayForm = !this.displayForm;
    }
    prettify(str) {
        return str.replace("_", " ");
    }
    changeActiveStatus() {
        if (this.element.active_status == null) {
            this.firebase.changeActiveStatus(this.userId, false);
        }
        else {
            this.firebase.changeActiveStatus(this.userId, !this.element.active_status);
        }
    }
    displayPastEvents(userId) {
        this.pastEventsUser = [];
        this.pastEvents.subscribe((snapshots) => {
            snapshots.forEach((snapshot) => {
                if (snapshot.uid == userId) {
                    //if the model has past events
                    this.pastEventsUser.push(snapshot); //push it to pastEvents
                }
            });
        });
    }
    displayCurrentEvents(userId) {
        this.currentEventsUser = [];
        this.events.subscribe((snapshots) => {
            snapshots.forEach((snapshot) => {
                if (!this.containsObject(snapshot, this.currentEventsUser)) {
                    if (snapshot.uid == userId) {
                        //if the model has past events
                        this.currentEventsUser.push(snapshot); //push it to pastEvents
                    }
                }
            });
        });
    }
    displayCancellation(userId) {
        this.cancelledEventsUser = [];
        this.cancelledEvents.subscribe((snapshots) => {
            snapshots.forEach((snapshot) => {
                if (snapshot.user_id == userId) {
                    this.cancelledEventsUser.push(snapshot);
                }
            });
        });
    }
    containsObject(obj, list) {
        var x;
        for (x in list) {
            if (list.hasOwnProperty(x) && list[x] === obj) {
                return true;
            }
        }
        return false;
    }
    //useful method
    formatDate(date) {
        if (date == null) {
            return "";
        }
        if (date.constructor == Date) {
            let month = date.toLocaleString('default', { month: 'long' });
            let day = date.getDate().toString();
            let year = date.getFullYear().toString();
            return month + " " + day + ", " + year;
        }
        else if (date.constructor == String) {
            const year = date.substring(0, 4);
            const month = date.substring(5, 7);
            const day = date.substring(8, 10);
            const newDate = new Date(parseInt(year), parseInt(month) - 1, parseInt(day));
            let month2 = newDate.toLocaleString('default', { month: 'long' });
            date = month2 + " " + day + ", " + year;
            ;
            return date;
        }
    }
    formatSignupDate(date) {
        let year = "20" + date.substring(0, 2);
        let day = date.substring(6);
        let month = date.substring(3, 5);
        return month + "/" + day + "/" + year;
    }
    formatEventId(eventId) {
        let code2 = eventId.substring(11);
        let event = eventId.substring(6, 11);
        let newId;
        switch (event) {
            case "kitam":
                newId = " Kitchen AM-" + code2;
                break;
            case "kitpm":
                newId = " Kitchen PM-" + code2;
                break;
            case "deldr":
                newId = " Delivery Driver-" + code2;
                break;
            case "deliv":
                newId = " Delivery-" + code2;
                break;
            case "kitas":
                newId = " Kitchen AM Sat-" + code2;
                break;
            case "kitps":
                newId = " Kitchen PM Sat-" + code2;
                break;
            case "delds":
                newId = " Delivery Driver Sat-" + code2;
                break;
            case "delis":
                newId = " Delivery Sat-" + code2;
                break;
        }
        return newId;
    }
    prettifyNumber(str) {
        if (str == null || str == "") {
            return "-";
        }
        if (str.length == 10) {
            let a = str.substring(0, 3);
            let b = str.substring(3, 6);
            let c = str.substring(6, 10);
            let phoneNumber = "(" + a + ") " + b + "-" + c;
            return phoneNumber;
        }
        else {
            return str;
        }
    }
    emergency(user) {
        let contact_name;
        let contact_rel;
        if (user.emergency_contact_name == null || user.emergency_contact_name == "") {
            return "-";
        }
        else {
            contact_name = user.emergency_contact_name;
            contact_rel = user.emergency_relationship;
        }
        return contact_name + " (" + contact_rel + ")";
    }
    //function is used to display 0 if cancellations property does not exists on user
    valid(num) {
        if (num) {
            return num;
        }
        else {
            return 0;
        }
    }
    updateUser(user) {
        this.db.object("/user/" + this.userId).update({
            address_city: user.address_city,
            address_number: user.address_number,
            address_postal_code: user.address_postal_code,
            address_street: user.address_street,
            dob: user.dob,
            email: user.email,
            phone_number: user.phone_number,
            emergency_contact_number: user.emergency_contact_number,
            emergency_contact_name: user.emergency_contact_name,
            emergency_relationship: user.emergency_relationship,
        });
    }
    onSave() {
        this.myForm.markAllAsTouched();
        if (this.myForm.valid) {
            this.updateUser(this.model);
            this.displayForm = !this.displayForm;
        }
    }
    checkBox() {
        if (this.element.active_status || this.element.active_status == null) {
            let statusCheckBox = document.getElementById("statusCheck");
            statusCheckBox.checked = true;
        }
    }
    formatEventDate(eventId) {
        let code1 = eventId.substring(0, 6);
        let day = code1.substring(4);
        let month = code1.substring(2, 4);
        let year = code1.substring(0, 2);
        let date = month + '/' + day + '/' + year;
        const newDate = new Date(parseInt(year), parseInt(month) - 1, parseInt(day));
        let month2 = newDate.toLocaleString('default', { month: 'long' });
        date = month2 + " " + day + ", " + year;
        return date;
    }
    onRemoveUserFromEvent(id) {
        this.firebase.removeUserFromEvent(id);
        this.removeUserFromEvent.emit(id);
    }
    formatEventType(eventType) {
        let newId;
        switch (eventType) {
            case "kitam":
                newId = "Kitchen AM";
                break;
            case "kitpm":
                newId = "Kitchen PM";
                break;
            case "deldr":
                newId = "Delivery Driver";
                break;
            case "deliv":
                newId = " Delivery";
                break;
        }
        return newId;
    }
};
UserEventComponent.ctorParameters = () => [
    { type: _ng_bootstrap_ng_bootstrap__WEBPACK_IMPORTED_MODULE_1__["NgbModal"] },
    { type: _angular_fire_database__WEBPACK_IMPORTED_MODULE_2__["AngularFireDatabase"] },
    { type: _firebase_service_service__WEBPACK_IMPORTED_MODULE_3__["FirebaseService"] },
    { type: _angular_forms__WEBPACK_IMPORTED_MODULE_4__["FormBuilder"] }
];
__decorate([
    Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["Input"])(),
    __metadata("design:type", String)
], UserEventComponent.prototype, "userId", void 0);
__decorate([
    Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["Output"])(),
    __metadata("design:type", _angular_core__WEBPACK_IMPORTED_MODULE_0__["EventEmitter"])
], UserEventComponent.prototype, "removeUserFromEvent", void 0);
UserEventComponent = __decorate([
    Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["Component"])({
        selector: "app-user-event",
        template: __importDefault(__webpack_require__(/*! raw-loader!./user-event.component.html */ "./node_modules/raw-loader/dist/cjs.js!./src/app/user-event/user-event.component.html")).default,
        styles: [__importDefault(__webpack_require__(/*! ./user-event.component.scss */ "./src/app/user-event/user-event.component.scss")).default]
    }),
    __metadata("design:paramtypes", [_ng_bootstrap_ng_bootstrap__WEBPACK_IMPORTED_MODULE_1__["NgbModal"],
        _angular_fire_database__WEBPACK_IMPORTED_MODULE_2__["AngularFireDatabase"],
        _firebase_service_service__WEBPACK_IMPORTED_MODULE_3__["FirebaseService"],
        _angular_forms__WEBPACK_IMPORTED_MODULE_4__["FormBuilder"]])
], UserEventComponent);



/***/ }),

/***/ "./src/app/user-profile/user-profile.component.css":
/*!*********************************************************!*\
  !*** ./src/app/user-profile/user-profile.component.css ***!
  \*********************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony default export */ __webpack_exports__["default"] = ("\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IiIsImZpbGUiOiJzcmMvYXBwL3VzZXItcHJvZmlsZS91c2VyLXByb2ZpbGUuY29tcG9uZW50LmNzcyJ9 */");

/***/ }),

/***/ "./src/app/user-profile/user-profile.component.ts":
/*!********************************************************!*\
  !*** ./src/app/user-profile/user-profile.component.ts ***!
  \********************************************************/
/*! exports provided: UserProfileComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "UserProfileComponent", function() { return UserProfileComponent; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/__ivy_ngcc__/fesm2015/core.js");
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/router */ "./node_modules/@angular/router/__ivy_ngcc__/fesm2015/router.js");
var __decorate = (undefined && undefined.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (undefined && undefined.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __importDefault = (undefined && undefined.__importDefault) || function (mod) {
  return (mod && mod.__esModule) ? mod : { "default": mod };
};


let UserProfileComponent = class UserProfileComponent {
    constructor(route) {
        this.route = route;
        this.route.params.subscribe(params => {
            console.log(params);
            this.id = params.id;
        });
    }
    ngOnInit() {
    }
};
UserProfileComponent.ctorParameters = () => [
    { type: _angular_router__WEBPACK_IMPORTED_MODULE_1__["ActivatedRoute"] }
];
UserProfileComponent = __decorate([
    Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["Component"])({
        selector: 'app-user-profile',
        template: __importDefault(__webpack_require__(/*! raw-loader!./user-profile.component.html */ "./node_modules/raw-loader/dist/cjs.js!./src/app/user-profile/user-profile.component.html")).default,
        styles: [__importDefault(__webpack_require__(/*! ./user-profile.component.css */ "./src/app/user-profile/user-profile.component.css")).default]
    }),
    __metadata("design:paramtypes", [_angular_router__WEBPACK_IMPORTED_MODULE_1__["ActivatedRoute"]])
], UserProfileComponent);



/***/ }),

/***/ "./src/app/volunteer-directory/volunteer-directory.component.scss":
/*!************************************************************************!*\
  !*** ./src/app/volunteer-directory/volunteer-directory.component.scss ***!
  \************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony default export */ __webpack_exports__["default"] = (".page-title {\n  padding-top: 1rem;\n  padding-bottom: 0;\n}\n\n.page-title h1 {\n  padding: 0.5rem;\n  text-align: center;\n  color: #60A4FF;\n}\n\n.container-search {\n  display: flex;\n  justify-content: space-between;\n  align-items: center;\n}\n\n.volunteer-search {\n  margin-left: 2.5%;\n  margin-top: 1%;\n  width: 400px;\n}\n\napp-new-user {\n  padding: 0;\n  margin-right: 2.5%;\n  margin-top: 2%;\n}\n\n.mat-table {\n  overflow: auto;\n  max-height: 500px;\n  width: 95%;\n  margin-left: 2.5%;\n  margin-right: 2.5%;\n}\n\nth.mat-sort-header-sorted {\n  color: black;\n}\n\n.container {\n  max-width: none;\n  padding: 0;\n}\n\n.container .header {\n  background-color: #5fce99;\n  color: white;\n  padding-top: 0.5rem;\n  padding-bottom: 0.5rem;\n  width: inherit;\n  margin: 0;\n}\n\n.volunteer-name {\n  font-weight: bold;\n  font-size: 16;\n  margin-left: 1rem;\n}\n\n.actions {\n  position: absolute;\n  right: 5%;\n}\n\n.valign-center {\n  display: inline-flex;\n  vertical-align: middle;\n  align-items: center;\n}\n\n.body {\n  background-color: #c1ecd7;\n  padding: 1rem;\n}\n\n.valign-center mat-icon {\n  margin-right: 0.5rem;\n}\n\n.element-detail {\n  overflow: hidden;\n  display: flex;\n}\n\n.element-row {\n  position: relative;\n}\n\n.element-row:not(.expanded) {\n  cursor: pointer;\n}\n\n.element-row:not(.expanded):hover {\n  background: #f5f5f5;\n}\n\n.element-row.expanded {\n  border-bottom-color: transparent;\n}\n\ntr.detail-row {\n  height: 0;\n}\n\ntr.element-row:not(.expanded-row):hover {\n  background: #f5f5f5;\n}\n\ntr.element-row:not(.expanded-row):active {\n  background: #efefef;\n}\n\n.element-row td {\n  border-bottom-width: 0;\n}\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi9Vc2Vycy9iZW5qYW1pbmVtaWxpYW5pL1NhbnRyb3BvbHJvdWxhbnQvYW5ndWxhci1lbGVjdHJvbi9zcmMvYXBwL3ZvbHVudGVlci1kaXJlY3Rvcnkvdm9sdW50ZWVyLWRpcmVjdG9yeS5jb21wb25lbnQuc2NzcyIsInNyYy9hcHAvdm9sdW50ZWVyLWRpcmVjdG9yeS92b2x1bnRlZXItZGlyZWN0b3J5LmNvbXBvbmVudC5zY3NzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUNBO0VBQ0UsaUJBQUE7RUFDQSxpQkFBQTtBQ0FGOztBREVBO0VBQ0UsZUFBQTtFQUNBLGtCQUFBO0VBQ0EsY0FBQTtBQ0NGOztBRElBO0VBQ0UsYUFBQTtFQUNBLDhCQUFBO0VBQ0EsbUJBQUE7QUNERjs7QURHQTtFQUNFLGlCQUFBO0VBQ0EsY0FBQTtFQUNBLFlBQUE7QUNBRjs7QURFQTtFQUNFLFVBQUE7RUFDQSxrQkFBQTtFQUNBLGNBQUE7QUNDRjs7QURJQTtFQUNFLGNBQUE7RUFDQSxpQkFBQTtFQUNBLFVBQUE7RUFDQSxpQkFBQTtFQUNBLGtCQUFBO0FDREY7O0FER0E7RUFDRSxZQUFBO0FDQUY7O0FES0E7RUFDRSxlQUFBO0VBQ0EsVUFBQTtBQ0ZGOztBRElBO0VBQ0UseUJBQUE7RUFDQSxZQUFBO0VBQ0EsbUJBQUE7RUFDQSxzQkFBQTtFQUNBLGNBQUE7RUFDQSxTQUFBO0FDREY7O0FER0E7RUFDRSxpQkFBQTtFQUNBLGFBQUE7RUFDQSxpQkFBQTtBQ0FGOztBREVBO0VBQ0Usa0JBQUE7RUFDQSxTQUFBO0FDQ0Y7O0FEQ0E7RUFDRSxvQkFBQTtFQUNBLHNCQUFBO0VBQ0EsbUJBQUE7QUNFRjs7QURBQTtFQUNFLHlCQUFBO0VBQ0EsYUFBQTtBQ0dGOztBRERBO0VBQ0Usb0JBQUE7QUNJRjs7QURGQTtFQUNFLGdCQUFBO0VBQ0EsYUFBQTtBQ0tGOztBREhBO0VBQ0Usa0JBQUE7QUNNRjs7QURKQTtFQUNFLGVBQUE7QUNPRjs7QURMQTtFQUNFLG1CQUFBO0FDUUY7O0FETkE7RUFDRSxnQ0FBQTtBQ1NGOztBRFBBO0VBQ0UsU0FBQTtBQ1VGOztBRFJBO0VBQ0UsbUJBQUE7QUNXRjs7QURUQTtFQUNFLG1CQUFBO0FDWUY7O0FEVkE7RUFDRSxzQkFBQTtBQ2FGIiwiZmlsZSI6InNyYy9hcHAvdm9sdW50ZWVyLWRpcmVjdG9yeS92b2x1bnRlZXItZGlyZWN0b3J5LmNvbXBvbmVudC5zY3NzIiwic291cmNlc0NvbnRlbnQiOlsiLy8gUGFnZSB0aXRsZVxuLnBhZ2UtdGl0bGUge1xuICBwYWRkaW5nLXRvcDogMXJlbTtcbiAgcGFkZGluZy1ib3R0b206IDA7XG59XG4ucGFnZS10aXRsZSBoMSB7XG4gIHBhZGRpbmc6MC41cmVtO1xuICB0ZXh0LWFsaWduOiBjZW50ZXI7XG4gIGNvbG9yOiAjNjBBNEZGO1xufVxuXG5cbi8vIFNlYXJjaCBjb250YWluZXJcbi5jb250YWluZXItc2VhcmNoIHtcbiAgZGlzcGxheTogZmxleDtcbiAganVzdGlmeS1jb250ZW50OiBzcGFjZS1iZXR3ZWVuO1xuICBhbGlnbi1pdGVtczogY2VudGVyO1xufVxuLnZvbHVudGVlci1zZWFyY2gge1xuICBtYXJnaW4tbGVmdDogMi41JTtcbiAgbWFyZ2luLXRvcDogMSU7XG4gIHdpZHRoOiA0MDBweDtcbn1cbmFwcC1uZXctdXNlciB7XG4gIHBhZGRpbmc6MDtcbiAgbWFyZ2luLXJpZ2h0OjIuNSU7XG4gIG1hcmdpbi10b3A6IDIlO1xufVxuXG5cbi8vIFZvbHVudGVlciB0YWJsZVxuLm1hdC10YWJsZSB7XG4gIG92ZXJmbG93OiBhdXRvO1xuICBtYXgtaGVpZ2h0OiA1MDBweDtcbiAgd2lkdGg6IDk1JTtcbiAgbWFyZ2luLWxlZnQ6IDIuNSU7XG4gIG1hcmdpbi1yaWdodDogMi41JTtcbn1cbnRoLm1hdC1zb3J0LWhlYWRlci1zb3J0ZWQge1xuICBjb2xvcjogYmxhY2s7XG59XG5cblxuLy8gRXhwYW5kZWQgRWxlbWVudFxuLmNvbnRhaW5lciB7XG4gIG1heC13aWR0aDogbm9uZTtcbiAgcGFkZGluZzogMDtcbn1cbi5jb250YWluZXIgLmhlYWRlciB7XG4gIGJhY2tncm91bmQtY29sb3I6ICM1ZmNlOTk7XG4gIGNvbG9yOiB3aGl0ZTtcbiAgcGFkZGluZy10b3A6IDAuNXJlbTtcbiAgcGFkZGluZy1ib3R0b206IDAuNXJlbTtcbiAgd2lkdGg6IGluaGVyaXQ7XG4gIG1hcmdpbjogMDtcbn1cbi52b2x1bnRlZXItbmFtZSB7XG4gIGZvbnQtd2VpZ2h0OiBib2xkO1xuICBmb250LXNpemU6IDE2O1xuICBtYXJnaW4tbGVmdDogMXJlbTtcbn1cbi5hY3Rpb25zIHtcbiAgcG9zaXRpb246IGFic29sdXRlO1xuICByaWdodDogNSU7XG59XG4udmFsaWduLWNlbnRlciB7XG4gIGRpc3BsYXk6IGlubGluZS1mbGV4O1xuICB2ZXJ0aWNhbC1hbGlnbjogbWlkZGxlO1xuICBhbGlnbi1pdGVtczogY2VudGVyO1xufVxuLmJvZHkge1xuICBiYWNrZ3JvdW5kLWNvbG9yOiNjMWVjZDc7XG4gIHBhZGRpbmc6IDFyZW07XG59XG4udmFsaWduLWNlbnRlciBtYXQtaWNvbiB7XG4gIG1hcmdpbi1yaWdodDogMC41cmVtO1xufVxuLmVsZW1lbnQtZGV0YWlsIHtcbiAgb3ZlcmZsb3c6IGhpZGRlbjtcbiAgZGlzcGxheTogZmxleDtcbn1cbi5lbGVtZW50LXJvdyB7XG4gIHBvc2l0aW9uOiByZWxhdGl2ZTtcbn1cbi5lbGVtZW50LXJvdzpub3QoLmV4cGFuZGVkKSB7XG4gIGN1cnNvcjogcG9pbnRlcjtcbn1cbi5lbGVtZW50LXJvdzpub3QoLmV4cGFuZGVkKTpob3ZlciB7XG4gIGJhY2tncm91bmQ6ICNmNWY1ZjU7XG59XG4uZWxlbWVudC1yb3cuZXhwYW5kZWQge1xuICBib3JkZXItYm90dG9tLWNvbG9yOiB0cmFuc3BhcmVudDtcbn1cbnRyLmRldGFpbC1yb3cge1xuICBoZWlnaHQ6IDA7XG59XG50ci5lbGVtZW50LXJvdzpub3QoLmV4cGFuZGVkLXJvdyk6aG92ZXIge1xuICBiYWNrZ3JvdW5kOiAjZjVmNWY1O1xufVxudHIuZWxlbWVudC1yb3c6bm90KC5leHBhbmRlZC1yb3cpOmFjdGl2ZSB7XG4gIGJhY2tncm91bmQ6ICNlZmVmZWY7XG59XG4uZWxlbWVudC1yb3cgdGQge1xuICBib3JkZXItYm90dG9tLXdpZHRoOiAwO1xufVxuIiwiLnBhZ2UtdGl0bGUge1xuICBwYWRkaW5nLXRvcDogMXJlbTtcbiAgcGFkZGluZy1ib3R0b206IDA7XG59XG5cbi5wYWdlLXRpdGxlIGgxIHtcbiAgcGFkZGluZzogMC41cmVtO1xuICB0ZXh0LWFsaWduOiBjZW50ZXI7XG4gIGNvbG9yOiAjNjBBNEZGO1xufVxuXG4uY29udGFpbmVyLXNlYXJjaCB7XG4gIGRpc3BsYXk6IGZsZXg7XG4gIGp1c3RpZnktY29udGVudDogc3BhY2UtYmV0d2VlbjtcbiAgYWxpZ24taXRlbXM6IGNlbnRlcjtcbn1cblxuLnZvbHVudGVlci1zZWFyY2gge1xuICBtYXJnaW4tbGVmdDogMi41JTtcbiAgbWFyZ2luLXRvcDogMSU7XG4gIHdpZHRoOiA0MDBweDtcbn1cblxuYXBwLW5ldy11c2VyIHtcbiAgcGFkZGluZzogMDtcbiAgbWFyZ2luLXJpZ2h0OiAyLjUlO1xuICBtYXJnaW4tdG9wOiAyJTtcbn1cblxuLm1hdC10YWJsZSB7XG4gIG92ZXJmbG93OiBhdXRvO1xuICBtYXgtaGVpZ2h0OiA1MDBweDtcbiAgd2lkdGg6IDk1JTtcbiAgbWFyZ2luLWxlZnQ6IDIuNSU7XG4gIG1hcmdpbi1yaWdodDogMi41JTtcbn1cblxudGgubWF0LXNvcnQtaGVhZGVyLXNvcnRlZCB7XG4gIGNvbG9yOiBibGFjaztcbn1cblxuLmNvbnRhaW5lciB7XG4gIG1heC13aWR0aDogbm9uZTtcbiAgcGFkZGluZzogMDtcbn1cblxuLmNvbnRhaW5lciAuaGVhZGVyIHtcbiAgYmFja2dyb3VuZC1jb2xvcjogIzVmY2U5OTtcbiAgY29sb3I6IHdoaXRlO1xuICBwYWRkaW5nLXRvcDogMC41cmVtO1xuICBwYWRkaW5nLWJvdHRvbTogMC41cmVtO1xuICB3aWR0aDogaW5oZXJpdDtcbiAgbWFyZ2luOiAwO1xufVxuXG4udm9sdW50ZWVyLW5hbWUge1xuICBmb250LXdlaWdodDogYm9sZDtcbiAgZm9udC1zaXplOiAxNjtcbiAgbWFyZ2luLWxlZnQ6IDFyZW07XG59XG5cbi5hY3Rpb25zIHtcbiAgcG9zaXRpb246IGFic29sdXRlO1xuICByaWdodDogNSU7XG59XG5cbi52YWxpZ24tY2VudGVyIHtcbiAgZGlzcGxheTogaW5saW5lLWZsZXg7XG4gIHZlcnRpY2FsLWFsaWduOiBtaWRkbGU7XG4gIGFsaWduLWl0ZW1zOiBjZW50ZXI7XG59XG5cbi5ib2R5IHtcbiAgYmFja2dyb3VuZC1jb2xvcjogI2MxZWNkNztcbiAgcGFkZGluZzogMXJlbTtcbn1cblxuLnZhbGlnbi1jZW50ZXIgbWF0LWljb24ge1xuICBtYXJnaW4tcmlnaHQ6IDAuNXJlbTtcbn1cblxuLmVsZW1lbnQtZGV0YWlsIHtcbiAgb3ZlcmZsb3c6IGhpZGRlbjtcbiAgZGlzcGxheTogZmxleDtcbn1cblxuLmVsZW1lbnQtcm93IHtcbiAgcG9zaXRpb246IHJlbGF0aXZlO1xufVxuXG4uZWxlbWVudC1yb3c6bm90KC5leHBhbmRlZCkge1xuICBjdXJzb3I6IHBvaW50ZXI7XG59XG5cbi5lbGVtZW50LXJvdzpub3QoLmV4cGFuZGVkKTpob3ZlciB7XG4gIGJhY2tncm91bmQ6ICNmNWY1ZjU7XG59XG5cbi5lbGVtZW50LXJvdy5leHBhbmRlZCB7XG4gIGJvcmRlci1ib3R0b20tY29sb3I6IHRyYW5zcGFyZW50O1xufVxuXG50ci5kZXRhaWwtcm93IHtcbiAgaGVpZ2h0OiAwO1xufVxuXG50ci5lbGVtZW50LXJvdzpub3QoLmV4cGFuZGVkLXJvdyk6aG92ZXIge1xuICBiYWNrZ3JvdW5kOiAjZjVmNWY1O1xufVxuXG50ci5lbGVtZW50LXJvdzpub3QoLmV4cGFuZGVkLXJvdyk6YWN0aXZlIHtcbiAgYmFja2dyb3VuZDogI2VmZWZlZjtcbn1cblxuLmVsZW1lbnQtcm93IHRkIHtcbiAgYm9yZGVyLWJvdHRvbS13aWR0aDogMDtcbn0iXX0= */");

/***/ }),

/***/ "./src/app/volunteer-directory/volunteer-directory.component.ts":
/*!**********************************************************************!*\
  !*** ./src/app/volunteer-directory/volunteer-directory.component.ts ***!
  \**********************************************************************/
/*! exports provided: VolunteerDirectoryComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "VolunteerDirectoryComponent", function() { return VolunteerDirectoryComponent; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/__ivy_ngcc__/fesm2015/core.js");
/* harmony import */ var _angular_material_table__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/material/table */ "./node_modules/@angular/material/__ivy_ngcc__/fesm2015/table.js");
/* harmony import */ var _angular_material_sort__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/material/sort */ "./node_modules/@angular/material/__ivy_ngcc__/fesm2015/sort.js");
/* harmony import */ var _firebase_service_service__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../firebase-service.service */ "./src/app/firebase-service.service.ts");
/* harmony import */ var _angular_fire_database__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @angular/fire/database */ "./node_modules/@angular/fire/__ivy_ngcc__/fesm2015/angular-fire-database.js");
/* harmony import */ var _angular_animations__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! @angular/animations */ "./node_modules/@angular/animations/__ivy_ngcc__/fesm2015/animations.js");
var __decorate = (undefined && undefined.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (undefined && undefined.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __importDefault = (undefined && undefined.__importDefault) || function (mod) {
  return (mod && mod.__esModule) ? mod : { "default": mod };
};






let VolunteerDirectoryComponent = class VolunteerDirectoryComponent {
    constructor(fs, db) {
        this.fs = fs;
        this.db = db;
        this.displayedColumns = ['first_name', 'last_name', 'email', 'phone_number'];
        this.volunteers = [];
        this.events = [];
        this.dataSource = new _angular_material_table__WEBPACK_IMPORTED_MODULE_1__["MatTableDataSource"]();
        this.errorMessage = "";
    }
    ngOnInit() {
    }
    ngAfterViewInit() {
        this.fs.getUsers().subscribe(snapshots => {
            snapshots.forEach(element => {
                element.phone_number = this.prettifyPhoneNumber(element.phone_number);
            });
            this.dataSource = new _angular_material_table__WEBPACK_IMPORTED_MODULE_1__["MatTableDataSource"](snapshots);
            this.dataSource.sort = this.sort;
            // let temp = Object.keys(this.volunteers[0]);
            // temp = temp.filter(e => !this.displayedColumns.includes(e));
        });
    }
    prettify(str) {
        let string = str.replace('_', ' ');
        return string.charAt(0).toUpperCase() + string.slice(1);
    }
    prettifyPhoneNumber(str) {
        let a = str.charAt(0) + str.charAt(1) + str.charAt(2);
        let b = str.charAt(3) + str.charAt(4) + str.charAt(5);
        let c = str.charAt(6) + str.charAt(7) + str.charAt(8) + str.charAt(9);
        let phoneNumber = '(' + a + ') ' + b + '-' + c;
        return phoneNumber;
    }
    prettifyBirthDate(str) {
        let str1 = str.slice(0, 10);
        str1 = this.reverseDate(str1);
        return str1;
    }
    // reformat the birth date displayed
    reverseDate(str) {
        let year = str.charAt(0) + str.charAt(1) + str.charAt(2) + str.charAt(3);
        let month = str.charAt(5) + str.charAt(6);
        let day = str.charAt(8) + str.charAt(9);
        let date = day + '-' + month + '-' + year;
        return date;
    }
    capitalize(str) {
        return str.toUpperCase();
    }
    updateNoShow(userId, noshowcount) {
        if (noshowcount !== -1) {
            this.db.object('/user/' + userId)
                .update({
                no_show: noshowcount,
            });
            this.errorMessage = "";
        }
        else {
            console.log("Tried to decrease the no show count below 0!");
            this.errorMessage = "Can't decrease the no show count below zero!";
        }
    }
    title(str) {
        return str.toUpperCase();
    }
    applyFilter(filterValue) {
        this.dataSource.filter = filterValue.trim().toLowerCase();
    }
};
VolunteerDirectoryComponent.ctorParameters = () => [
    { type: _firebase_service_service__WEBPACK_IMPORTED_MODULE_3__["FirebaseService"] },
    { type: _angular_fire_database__WEBPACK_IMPORTED_MODULE_4__["AngularFireDatabase"] }
];
__decorate([
    Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["ViewChild"])(_angular_material_sort__WEBPACK_IMPORTED_MODULE_2__["MatSort"], { static: true }),
    __metadata("design:type", _angular_material_sort__WEBPACK_IMPORTED_MODULE_2__["MatSort"])
], VolunteerDirectoryComponent.prototype, "sort", void 0);
VolunteerDirectoryComponent = __decorate([
    Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["Component"])({
        selector: 'app-volunteer-directory',
        template: __importDefault(__webpack_require__(/*! raw-loader!./volunteer-directory.component.html */ "./node_modules/raw-loader/dist/cjs.js!./src/app/volunteer-directory/volunteer-directory.component.html")).default,
        animations: [
            Object(_angular_animations__WEBPACK_IMPORTED_MODULE_5__["trigger"])('detailExpand', [
                Object(_angular_animations__WEBPACK_IMPORTED_MODULE_5__["state"])('collapsed', Object(_angular_animations__WEBPACK_IMPORTED_MODULE_5__["style"])({ height: '0px', minHeight: '0', display: 'none' })),
                Object(_angular_animations__WEBPACK_IMPORTED_MODULE_5__["state"])('expanded', Object(_angular_animations__WEBPACK_IMPORTED_MODULE_5__["style"])({ height: '*' })),
                Object(_angular_animations__WEBPACK_IMPORTED_MODULE_5__["transition"])('expanded <=> collapsed', Object(_angular_animations__WEBPACK_IMPORTED_MODULE_5__["animate"])('225ms cubic-bezier(0.4, 0.0, 0.2, 1)')),
            ]),
        ],
        styles: [__importDefault(__webpack_require__(/*! ./volunteer-directory.component.scss */ "./src/app/volunteer-directory/volunteer-directory.component.scss")).default]
    }),
    __metadata("design:paramtypes", [_firebase_service_service__WEBPACK_IMPORTED_MODULE_3__["FirebaseService"], _angular_fire_database__WEBPACK_IMPORTED_MODULE_4__["AngularFireDatabase"]])
], VolunteerDirectoryComponent);



/***/ }),

/***/ "./src/app/week-generator/week-generator.component.css":
/*!*************************************************************!*\
  !*** ./src/app/week-generator/week-generator.component.css ***!
  \*************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony default export */ __webpack_exports__["default"] = ("::ng-deep .permanent-volunteer .modal-dialog {\n     max-width: 80% !important;\n     width: 80% !important;\n\n}\n::ng-deep { .cdk-global-overlay-wrapper, .cdk-overlay-container { z-index: 9999!important; } }\n.cdk-overlay-connected-position-bounding-box {\n  z-index: 99999 !important;\n}\n.fa {\n  padding-right: 0.5rem;\n}\n.form{\n  padding-bottom: 0;\n}\n.modal-header{\n  background-color: #5fce99;\n}\n.modal-title{\n  color: white;\n}\n.img-warning {\n  margin-bottom:1rem;\n  margin:auto;\n  margin-top: 1.5rem;\n}\n.modal-body{\n  padding: 1rem 2rem 0 2rem;\n  padding-top:2rem;\n  padding-bottom:2rem;\n}\n.btn-cancel {\n  margin-right:1rem;\n}\n.btn-remove-volunteer {\n  color:white;\n  background:#dc3545;\n}\n.btn-remove-volunteer:hover {\n  background: #bb202f;\n}\n.footer{\n  padding-bottom: 2.5rem;\n  text-align: center;\n}\n\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInNyYy9hcHAvd2Vlay1nZW5lcmF0b3Ivd2Vlay1nZW5lcmF0b3IuY29tcG9uZW50LmNzcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQTtLQUNLLHlCQUF5QjtLQUN6QixxQkFBcUI7O0FBRTFCO0FBQ0EsWUFBWSxzREFBc0QsdUJBQXVCLEVBQUUsRUFBRTtBQUM3RjtFQUNFLHlCQUF5QjtBQUMzQjtBQUNBO0VBQ0UscUJBQXFCO0FBQ3ZCO0FBRUE7RUFDRSxpQkFBaUI7QUFDbkI7QUFFQTtFQUNFLHlCQUF5QjtBQUMzQjtBQUdBO0VBQ0UsWUFBWTtBQUNkO0FBRUE7RUFDRSxrQkFBa0I7RUFDbEIsV0FBVztFQUNYLGtCQUFrQjtBQUNwQjtBQUVBO0VBQ0UseUJBQXlCO0VBQ3pCLGdCQUFnQjtFQUNoQixtQkFBbUI7QUFDckI7QUFDQTtFQUNFLGlCQUFpQjtBQUNuQjtBQUVBO0VBQ0UsV0FBVztFQUNYLGtCQUFrQjtBQUNwQjtBQUVBO0VBQ0UsbUJBQW1CO0FBQ3JCO0FBRUE7RUFDRSxzQkFBc0I7RUFDdEIsa0JBQWtCO0FBQ3BCIiwiZmlsZSI6InNyYy9hcHAvd2Vlay1nZW5lcmF0b3Ivd2Vlay1nZW5lcmF0b3IuY29tcG9uZW50LmNzcyIsInNvdXJjZXNDb250ZW50IjpbIjo6bmctZGVlcCAucGVybWFuZW50LXZvbHVudGVlciAubW9kYWwtZGlhbG9nIHtcbiAgICAgbWF4LXdpZHRoOiA4MCUgIWltcG9ydGFudDtcbiAgICAgd2lkdGg6IDgwJSAhaW1wb3J0YW50O1xuXG59XG46Om5nLWRlZXAgeyAuY2RrLWdsb2JhbC1vdmVybGF5LXdyYXBwZXIsIC5jZGstb3ZlcmxheS1jb250YWluZXIgeyB6LWluZGV4OiA5OTk5IWltcG9ydGFudDsgfSB9XG4uY2RrLW92ZXJsYXktY29ubmVjdGVkLXBvc2l0aW9uLWJvdW5kaW5nLWJveCB7XG4gIHotaW5kZXg6IDk5OTk5ICFpbXBvcnRhbnQ7XG59XG4uZmEge1xuICBwYWRkaW5nLXJpZ2h0OiAwLjVyZW07XG59XG5cbi5mb3Jte1xuICBwYWRkaW5nLWJvdHRvbTogMDtcbn1cblxuLm1vZGFsLWhlYWRlcntcbiAgYmFja2dyb3VuZC1jb2xvcjogIzVmY2U5OTtcbn1cblxuXG4ubW9kYWwtdGl0bGV7XG4gIGNvbG9yOiB3aGl0ZTtcbn1cblxuLmltZy13YXJuaW5nIHtcbiAgbWFyZ2luLWJvdHRvbToxcmVtO1xuICBtYXJnaW46YXV0bztcbiAgbWFyZ2luLXRvcDogMS41cmVtO1xufVxuXG4ubW9kYWwtYm9keXtcbiAgcGFkZGluZzogMXJlbSAycmVtIDAgMnJlbTtcbiAgcGFkZGluZy10b3A6MnJlbTtcbiAgcGFkZGluZy1ib3R0b206MnJlbTtcbn1cbi5idG4tY2FuY2VsIHtcbiAgbWFyZ2luLXJpZ2h0OjFyZW07XG59XG5cbi5idG4tcmVtb3ZlLXZvbHVudGVlciB7XG4gIGNvbG9yOndoaXRlO1xuICBiYWNrZ3JvdW5kOiNkYzM1NDU7XG59XG5cbi5idG4tcmVtb3ZlLXZvbHVudGVlcjpob3ZlciB7XG4gIGJhY2tncm91bmQ6ICNiYjIwMmY7XG59XG5cbi5mb290ZXJ7XG4gIHBhZGRpbmctYm90dG9tOiAyLjVyZW07XG4gIHRleHQtYWxpZ246IGNlbnRlcjtcbn1cbiJdfQ== */");

/***/ }),

/***/ "./src/app/week-generator/week-generator.component.ts":
/*!************************************************************!*\
  !*** ./src/app/week-generator/week-generator.component.ts ***!
  \************************************************************/
/*! exports provided: WeekGeneratorComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "WeekGeneratorComponent", function() { return WeekGeneratorComponent; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/__ivy_ngcc__/fesm2015/core.js");
/* harmony import */ var _ng_bootstrap_ng_bootstrap__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @ng-bootstrap/ng-bootstrap */ "./node_modules/@ng-bootstrap/ng-bootstrap/__ivy_ngcc__/fesm2015/ng-bootstrap.js");
/* harmony import */ var _angular_fire_database__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/fire/database */ "./node_modules/@angular/fire/__ivy_ngcc__/fesm2015/angular-fire-database.js");
/* harmony import */ var _angular_forms__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @angular/forms */ "./node_modules/@angular/forms/__ivy_ngcc__/fesm2015/forms.js");
/* harmony import */ var _firebase_service_service__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../firebase-service.service */ "./src/app/firebase-service.service.ts");
var __decorate = (undefined && undefined.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (undefined && undefined.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __importDefault = (undefined && undefined.__importDefault) || function (mod) {
  return (mod && mod.__esModule) ? mod : { "default": mod };
};





let WeekGeneratorComponent = class WeekGeneratorComponent {
    constructor(modalService, formBuilder, fs, db) {
        this.modalService = modalService;
        this.formBuilder = formBuilder;
        this.fs = fs;
        this.db = db;
        this.active = 1;
        this.volunteers = [];
        this.events = [];
        this.model = { kitamSlots: [], kitpmSlots: [], delivSlots: [], deldrSlots: [] };
        this.threeMondays = [];
        this.nearestMonday = new Date();
        this.types = ['deldr', 'deliv', 'kitam', 'kitpm'];
        this.slotAmount = [2, 12, 6, 6];
        this.startTimes = ['14:45', '14:45', '9:30', '13:30'];
        this.endTimes = ['18:00', '18:00', '12:30', '16:00'];
        this.today = new Date();
        this.aYearFromNow = new Date();
        this.aYearFromNow.setFullYear(this.aYearFromNow.getFullYear() + 1);
    }
    ngOnInit() {
        this.nearestMonday = this.getMonday(new Date());
        for (let a = 0; a < 3; a++) { //next 3 weeks to choose from
            this.threeMondays.push(this.nearestMonday);
            let incrementInMilliseconds = 7 * 24 * 60 * 60 * 1000;
            this.nearestMonday.setTime(this.nearestMonday.getTime() + incrementInMilliseconds);
            console.log(this.threeMondays);
            console.log(a);
        }
        this.addPermanentForm = this.formBuilder.group({
            startDate: ['', _angular_forms__WEBPACK_IMPORTED_MODULE_3__["Validators"].required],
            kitamSlots: [[6, 6, 6, 0, 6, 6, 0], _angular_forms__WEBPACK_IMPORTED_MODULE_3__["Validators"].required],
            kitpmSlots: [[4, 4, 4, 4, 4, 4, 0], _angular_forms__WEBPACK_IMPORTED_MODULE_3__["Validators"].required],
            delivSlots: [[12, 12, 12, 12, 12, 12, 0], _angular_forms__WEBPACK_IMPORTED_MODULE_3__["Validators"].required],
            deldrSlots: [[4, 4, 4, 4, 4, 4, 0], _angular_forms__WEBPACK_IMPORTED_MODULE_3__["Validators"].required],
        });
    }
    endDateRequiredError() {
        return (this.model.endDate == undefined || this.model.endDate == null) || (this.model.endDate < this.model.startDate);
    }
    startDateRequiredError() {
        return this.model.startDate == undefined || this.model.startDate == null;
    }
    open(content) {
        this.modalReference = this.modalService.open(content, { ariaLabelledBy: 'modal-basic-title', size: 'sm', windowClass: 'permanent-volunteer-directory', centered: true });
    }
    delete(eventID) {
        this.fs.removePermanentVolunteer(eventID);
    }
    onSubmit(event) {
        if (event == "remove") {
            this.modalReference.close();
        }
        if (event == "add") {
            //   this.addPermanentForm.markAllAsTouched();
            //   if (this.addPermanentForm.valid) {
            //     this.modalReference.close();
            //
            //
            //       for (let weekdayNo = 0; weekdayNo < 6; weekdayNo++){ //for each weekday
            //               if (weekdayNo == 3) {//thursday
            //                       let incrementInMilliseconds = weekdayNo * 24 * 60 * 60 * 1000;
            //                       let date2 = new Date(date.toDateString());
            //                       date2.setTime(date.getTime() + incrementInMilliseconds);
            //                       let dateNumber = getDateNumber(date2);
            //                       let dateString = getDateString(date2);
            //                       for (let j = 0; j < 4; j++){ //for each slot
            //                               console.log(dateNumber + 'kitpm' + pad(j+1, 2));
            //                               var eventNameRef = this.db.object('/event/'+ dateNumber + 'kitpm' + pad(j+1, 2));
            //                               eventNameRef.update({
            //                                 event_date: dateNumber,
            //                                 event_date_txt: dateString,
            //                                 event_time_end: this.endTimes[3],
            //                                 event_time_start: this.startTimes[3],
            //                                 event_type: 'kitpm',
            //                                 first_name: '',
            //                                 first_shift: false,
            //                                 is_current: true,
            //                                 is_important_event: false,
            //                                 key: 'nan',
            //                                 last_name: '',
            //                                 note: '',
            //                                 slot: pad(j+1,2),
            //                                 uid: 'nan'
            //                               })
            //                       }
            //               }
            //
            //                else {
            //                       for (let i = 0; i < types.length; i++){ //for each type
            //                               let incrementInMilliseconds = weekdayNo * 24 * 60 * 60 * 1000;
            //                               let date2 = new Date(date.toDateString());
            //                               date2.setTime(date.getTime() + incrementInMilliseconds);
            //                               let dateNumber = getDateNumber(date2);
            //                               let dateString = getDateString(date2);
            //                               for (let j = 0; j < slotAmount[i]; j++){ //for each slot
            //                                       console.log(dateNumber + types[i] + pad(j+1, 2));
            //                                       var eventNameRef = this.db.object('/event/'+ dateNumber + types[i] + pad(j+1, 2));
            //                                       eventNameRef.set({
            //                                         event_date: dateNumber,
            //                                         event_date_txt: dateString,
            //                                         event_time_end: endTimes[i],
            //                                         event_time_start: startTimes[i],
            //                                         event_type: types[i],
            //                                         first_name: '',
            //                                         first_shift: false,
            //                                         is_current: true,
            //                                         is_important_event: false,
            //                                         key: 'nan',
            //                                         last_name: '',
            //                                         note: '',
            //                                         slot: pad(j+1,2),
            //                                         uid: 'nan'
            //                                       })
            //                               }
            //                       }
            //               }
            //       }
            //     this.addPermanentForm.reset();
            //     this.model = {};
            //   }
            // }
        }
    }
    getMonday(d) {
        d = new Date(d);
        var day = d.getDay(), diff = d.getDate() - day + (day == 0 ? -6 : 1); // adjust when day is sunday
        return new Date(d.setDate(diff));
    }
};
WeekGeneratorComponent.ctorParameters = () => [
    { type: _ng_bootstrap_ng_bootstrap__WEBPACK_IMPORTED_MODULE_1__["NgbModal"] },
    { type: _angular_forms__WEBPACK_IMPORTED_MODULE_3__["FormBuilder"] },
    { type: _firebase_service_service__WEBPACK_IMPORTED_MODULE_4__["FirebaseService"] },
    { type: _angular_fire_database__WEBPACK_IMPORTED_MODULE_2__["AngularFireDatabase"] }
];
WeekGeneratorComponent = __decorate([
    Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["Component"])({
        selector: 'app-week-generator',
        template: __importDefault(__webpack_require__(/*! raw-loader!./week-generator.component.html */ "./node_modules/raw-loader/dist/cjs.js!./src/app/week-generator/week-generator.component.html")).default,
        styles: [__importDefault(__webpack_require__(/*! ./week-generator.component.css */ "./src/app/week-generator/week-generator.component.css")).default]
    }),
    __metadata("design:paramtypes", [_ng_bootstrap_ng_bootstrap__WEBPACK_IMPORTED_MODULE_1__["NgbModal"], _angular_forms__WEBPACK_IMPORTED_MODULE_3__["FormBuilder"], _firebase_service_service__WEBPACK_IMPORTED_MODULE_4__["FirebaseService"], _angular_fire_database__WEBPACK_IMPORTED_MODULE_2__["AngularFireDatabase"]])
], WeekGeneratorComponent);



/***/ }),

/***/ "./src/environments/environment.ts":
/*!*****************************************!*\
  !*** ./src/environments/environment.ts ***!
  \*****************************************/
/*! exports provided: AppConfig */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "AppConfig", function() { return AppConfig; });
var __importDefault = (undefined && undefined.__importDefault) || function (mod) {
  return (mod && mod.__esModule) ? mod : { "default": mod };
};
const AppConfig = {
    production: false,
    environment: 'LOCAL',
    firebase: {
        apiKey: "AIzaSyBTiUXyilIjxNRhMd_DOdefWHT7-YFqfso",
        authDomain: "santropolroulant-b4d14.firebaseapp.com",
        databaseURL: "https://santropolroulant-b4d14.firebaseio.com",
        projectId: "santropolroulant-b4d14",
        storageBucket: "santropolroulant-b4d14.appspot.com",
        messagingSenderId: "730863709360"
    }
};


/***/ }),

/***/ "./src/main.ts":
/*!*********************!*\
  !*** ./src/main.ts ***!
  \*********************/
/*! no exports provided */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/__ivy_ngcc__/fesm2015/core.js");
/* harmony import */ var _angular_platform_browser_dynamic__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/platform-browser-dynamic */ "./node_modules/@angular/platform-browser-dynamic/__ivy_ngcc__/fesm2015/platform-browser-dynamic.js");
/* harmony import */ var _app_app_module__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./app/app.module */ "./src/app/app.module.ts");
/* harmony import */ var _environments_environment__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./environments/environment */ "./src/environments/environment.ts");
var __importDefault = (undefined && undefined.__importDefault) || function (mod) {
  return (mod && mod.__esModule) ? mod : { "default": mod };
};




if (_environments_environment__WEBPACK_IMPORTED_MODULE_3__["AppConfig"].production) {
    Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["enableProdMode"])();
}
Object(_angular_platform_browser_dynamic__WEBPACK_IMPORTED_MODULE_1__["platformBrowserDynamic"])()
    .bootstrapModule(_app_app_module__WEBPACK_IMPORTED_MODULE_2__["AppModule"], {
    preserveWhitespaces: false
})
    .catch(err => console.error(err));


/***/ }),

/***/ "./src/polyfills.ts":
/*!**************************!*\
  !*** ./src/polyfills.ts ***!
  \**************************/
/*! no exports provided */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _angular_localize_init__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/localize/init */ "./node_modules/@angular/localize/fesm2015/init.js");
/* harmony import */ var _angular_localize_init__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_angular_localize_init__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var zone_js_dist_zone__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! zone.js/dist/zone */ "./node_modules/zone.js/dist/zone-evergreen.js");
/* harmony import */ var zone_js_dist_zone__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(zone_js_dist_zone__WEBPACK_IMPORTED_MODULE_1__);
var __importDefault = (undefined && undefined.__importDefault) || function (mod) {
  return (mod && mod.__esModule) ? mod : { "default": mod };
};

/**
 * This file includes polyfills needed by Angular and is loaded before the app.
 * You can add your own extra polyfills to this file.
 *
 * This file is divided into 2 sections:
 *   1. Browser polyfills. These are applied before loading ZoneJS and are sorted by browsers.
 *   2. Application imports. Files imported after ZoneJS that should be loaded before your main
 *      file.
 *
 * The current setup is for so-called "evergreen" browsers; the last versions of browsers that
 * automatically update themselves. This includes Safari >= 10, Chrome >= 55 (including Opera),
 * Edge >= 13 on the desktop, and iOS 10 and Chrome on mobile.
 *
 * Learn more in https://angular.io/guide/browser-support
 */
/***************************************************************************************************
 * BROWSER POLYFILLS
 */
/** IE10 and IE11 requires the following for NgClass support on SVG elements */
// import 'classlist.js';  // Run `npm install --save classlist.js`.
/**
 * Web Animations `@angular/platform-browser/animations`
 * Only required if AnimationBuilder is used within the application and using IE/Edge or Safari.
 * Standard animation support in Angular DOES NOT require any polyfills (as of Angular 6.0).
 */
// import 'web-animations-js';  // Run `npm install --save web-animations-js`.
/**
 * By default, zone.js will patch all possible macroTask and DomEvents
 * user can disable parts of macroTask/DomEvents patch by setting following flags
 * because those flags need to be set before `zone.js` being loaded, and webpack
 * will put import in the top of bundle, so user need to create a separate file
 * in this directory (for example: zone-flags.ts), and put the following flags
 * into that file, and then add the following code before importing zone.js.
 * import './zone-flags.ts';
 *
 * The flags allowed in zone-flags.ts are listed here.
 *
 * The following flags will work for all browsers.
 *
 * (window as any).__Zone_disable_requestAnimationFrame = true; // disable patch requestAnimationFrame
 * (window as any).__Zone_disable_on_property = true; // disable patch onProperty such as onclick
 * (window as any).__zone_symbol__UNPATCHED_EVENTS = ['scroll', 'mousemove']; // disable patch specified eventNames
 *
 *  in IE/Edge developer tools, the addEventListener will also be wrapped by zone.js
 *  with the following flag, it will bypass `zone.js` patch for IE/Edge
 *
 *  (window as any).__Zone_enable_cross_context_check = true;
 *
 */
/***************************************************************************************************
 * Zone JS is required by default for Angular itself.
 */
 // Included with Angular CLI.
/***************************************************************************************************
 * APPLICATION IMPORTS
 */


/***/ }),

/***/ 0:
/*!***************************!*\
  !*** multi ./src/main.ts ***!
  \***************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__(/*! /Users/benjaminemiliani/Santropolroulant/angular-electron/src/main.ts */"./src/main.ts");


/***/ })

},[[0,"runtime","vendor"]]]);
//# sourceMappingURL=main-es2015.js.map