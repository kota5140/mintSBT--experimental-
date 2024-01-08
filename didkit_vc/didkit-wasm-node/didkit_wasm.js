let imports = {};
imports['__wbindgen_placeholder__'] = module.exports;
let wasm;
const { TextDecoder, TextEncoder } = require(`util`);

let cachedTextDecoder = new TextDecoder('utf-8', { ignoreBOM: true, fatal: true });

cachedTextDecoder.decode();

let cachedUint8Memory0 = null;

function getUint8Memory0() {
    if (cachedUint8Memory0 === null || cachedUint8Memory0.byteLength === 0) {
        cachedUint8Memory0 = new Uint8Array(wasm.memory.buffer);
    }
    return cachedUint8Memory0;
}

function getStringFromWasm0(ptr, len) {
    ptr = ptr >>> 0;
    return cachedTextDecoder.decode(getUint8Memory0().subarray(ptr, ptr + len));
}

const heap = new Array(128).fill(undefined);

heap.push(undefined, null, true, false);

let heap_next = heap.length;

function addHeapObject(obj) {
    if (heap_next === heap.length) heap.push(heap.length + 1);
    const idx = heap_next;
    heap_next = heap[idx];

    heap[idx] = obj;
    return idx;
}

function getObject(idx) { return heap[idx]; }

function dropObject(idx) {
    if (idx < 132) return;
    heap[idx] = heap_next;
    heap_next = idx;
}

function takeObject(idx) {
    const ret = getObject(idx);
    dropObject(idx);
    return ret;
}

let WASM_VECTOR_LEN = 0;

let cachedTextEncoder = new TextEncoder('utf-8');

const encodeString = (typeof cachedTextEncoder.encodeInto === 'function'
    ? function (arg, view) {
        return cachedTextEncoder.encodeInto(arg, view);
    }
    : function (arg, view) {
        const buf = cachedTextEncoder.encode(arg);
        view.set(buf);
        return {
            read: arg.length,
            written: buf.length
        };
    });

function passStringToWasm0(arg, malloc, realloc) {

    if (realloc === undefined) {
        const buf = cachedTextEncoder.encode(arg);
        const ptr = malloc(buf.length, 1) >>> 0;
        getUint8Memory0().subarray(ptr, ptr + buf.length).set(buf);
        WASM_VECTOR_LEN = buf.length;
        return ptr;
    }

    let len = arg.length;
    let ptr = malloc(len, 1) >>> 0;

    const mem = getUint8Memory0();

    let offset = 0;

    for (; offset < len; offset++) {
        const code = arg.charCodeAt(offset);
        if (code > 0x7F) break;
        mem[ptr + offset] = code;
    }

    if (offset !== len) {
        if (offset !== 0) {
            arg = arg.slice(offset);
        }
        ptr = realloc(ptr, len, len = offset + arg.length * 3, 1) >>> 0;
        const view = getUint8Memory0().subarray(ptr + offset, ptr + len);
        const ret = encodeString(arg, view);

        offset += ret.written;
    }

    WASM_VECTOR_LEN = offset;
    return ptr;
}

function isLikeNone(x) {
    return x === undefined || x === null;
}

let cachedInt32Memory0 = null;

function getInt32Memory0() {
    if (cachedInt32Memory0 === null || cachedInt32Memory0.byteLength === 0) {
        cachedInt32Memory0 = new Int32Array(wasm.memory.buffer);
    }
    return cachedInt32Memory0;
}

function debugString(val) {
    // primitive types
    const type = typeof val;
    if (type == 'number' || type == 'boolean' || val == null) {
        return `${val}`;
    }
    if (type == 'string') {
        return `"${val}"`;
    }
    if (type == 'symbol') {
        const description = val.description;
        if (description == null) {
            return 'Symbol';
        } else {
            return `Symbol(${description})`;
        }
    }
    if (type == 'function') {
        const name = val.name;
        if (typeof name == 'string' && name.length > 0) {
            return `Function(${name})`;
        } else {
            return 'Function';
        }
    }
    // objects
    if (Array.isArray(val)) {
        const length = val.length;
        let debug = '[';
        if (length > 0) {
            debug += debugString(val[0]);
        }
        for (let i = 1; i < length; i++) {
            debug += ', ' + debugString(val[i]);
        }
        debug += ']';
        return debug;
    }
    // Test for built-in
    const builtInMatches = /\[object ([^\]]+)\]/.exec(toString.call(val));
    let className;
    if (builtInMatches.length > 1) {
        className = builtInMatches[1];
    } else {
        // Failed to match the standard '[object ClassName]'
        return toString.call(val);
    }
    if (className == 'Object') {
        // we're a user defined class or Object
        // JSON.stringify avoids problems with cycles, and is generally much
        // easier than looping through ownProperties of `val`.
        try {
            return 'Object(' + JSON.stringify(val) + ')';
        } catch (_) {
            return 'Object';
        }
    }
    // errors
    if (val instanceof Error) {
        return `${val.name}: ${val.message}\n${val.stack}`;
    }
    // TODO we could test for more things here, like `Set`s and `Map`s.
    return className;
}

function makeMutClosure(arg0, arg1, dtor, f) {
    const state = { a: arg0, b: arg1, cnt: 1, dtor };
    const real = (...args) => {
        // First up with a closure we increment the internal reference
        // count. This ensures that the Rust closure environment won't
        // be deallocated while we're invoking it.
        state.cnt++;
        const a = state.a;
        state.a = 0;
        try {
            return f(a, state.b, ...args);
        } finally {
            if (--state.cnt === 0) {
                wasm.__wbindgen_export_2.get(state.dtor)(a, state.b);

            } else {
                state.a = a;
            }
        }
    };
    real.original = state;

    return real;
}
function __wbg_adapter_26(arg0, arg1, arg2) {
    wasm.wasm_bindgen__convert__closures__invoke1_mut__h41479b5e7be37879(arg0, arg1, addHeapObject(arg2));
}

/**
* @returns {string}
*/
module.exports.getVersion = function () {
    let deferred1_0;
    let deferred1_1;
    try {
        const retptr = wasm.__wbindgen_add_to_stack_pointer(-16);
        wasm.getVersion(retptr);
        var r0 = getInt32Memory0()[retptr / 4 + 0];
        var r1 = getInt32Memory0()[retptr / 4 + 1];
        deferred1_0 = r0;
        deferred1_1 = r1;
        return getStringFromWasm0(r0, r1);
    } finally {
        wasm.__wbindgen_add_to_stack_pointer(16);
        wasm.__wbindgen_free(deferred1_0, deferred1_1, 1);
    }
}

/**
* @param {string} did
* @param {string} input_metadata
* @returns {Promise<any>}
*/
module.exports.resolveDID = function (did, input_metadata) {
    const ptr0 = passStringToWasm0(did, wasm.__wbindgen_malloc, wasm.__wbindgen_realloc);
    const len0 = WASM_VECTOR_LEN;
    const ptr1 = passStringToWasm0(input_metadata, wasm.__wbindgen_malloc, wasm.__wbindgen_realloc);
    const len1 = WASM_VECTOR_LEN;
    const ret = wasm.resolveDID(ptr0, len0, ptr1, len1);
    return takeObject(ret);
}

/**
* @returns {string}
*/
module.exports.generateEd25519Key = function () {
    let deferred2_0;
    let deferred2_1;
    try {
        const retptr = wasm.__wbindgen_add_to_stack_pointer(-16);
        wasm.generateEd25519Key(retptr);
        var r0 = getInt32Memory0()[retptr / 4 + 0];
        var r1 = getInt32Memory0()[retptr / 4 + 1];
        var r2 = getInt32Memory0()[retptr / 4 + 2];
        var r3 = getInt32Memory0()[retptr / 4 + 3];
        var ptr1 = r0;
        var len1 = r1;
        if (r3) {
            ptr1 = 0; len1 = 0;
            throw takeObject(r2);
        }
        deferred2_0 = ptr1;
        deferred2_1 = len1;
        return getStringFromWasm0(ptr1, len1);
    } finally {
        wasm.__wbindgen_add_to_stack_pointer(16);
        wasm.__wbindgen_free(deferred2_0, deferred2_1, 1);
    }
}

/**
* @param {string} method_pattern
* @param {string} jwk
* @returns {string}
*/
module.exports.keyToDID = function (method_pattern, jwk) {
    let deferred4_0;
    let deferred4_1;
    try {
        const retptr = wasm.__wbindgen_add_to_stack_pointer(-16);
        const ptr0 = passStringToWasm0(method_pattern, wasm.__wbindgen_malloc, wasm.__wbindgen_realloc);
        const len0 = WASM_VECTOR_LEN;
        const ptr1 = passStringToWasm0(jwk, wasm.__wbindgen_malloc, wasm.__wbindgen_realloc);
        const len1 = WASM_VECTOR_LEN;
        wasm.keyToDID(retptr, ptr0, len0, ptr1, len1);
        var r0 = getInt32Memory0()[retptr / 4 + 0];
        var r1 = getInt32Memory0()[retptr / 4 + 1];
        var r2 = getInt32Memory0()[retptr / 4 + 2];
        var r3 = getInt32Memory0()[retptr / 4 + 3];
        var ptr3 = r0;
        var len3 = r1;
        if (r3) {
            ptr3 = 0; len3 = 0;
            throw takeObject(r2);
        }
        deferred4_0 = ptr3;
        deferred4_1 = len3;
        return getStringFromWasm0(ptr3, len3);
    } finally {
        wasm.__wbindgen_add_to_stack_pointer(16);
        wasm.__wbindgen_free(deferred4_0, deferred4_1, 1);
    }
}

/**
* @param {string} method_pattern
* @param {string} jwk
* @returns {Promise<any>}
*/
module.exports.keyToVerificationMethod = function (method_pattern, jwk) {
    const ptr0 = passStringToWasm0(method_pattern, wasm.__wbindgen_malloc, wasm.__wbindgen_realloc);
    const len0 = WASM_VECTOR_LEN;
    const ptr1 = passStringToWasm0(jwk, wasm.__wbindgen_malloc, wasm.__wbindgen_realloc);
    const len1 = WASM_VECTOR_LEN;
    const ret = wasm.keyToVerificationMethod(ptr0, len0, ptr1, len1);
    return takeObject(ret);
}

/**
* @param {string} credential
* @param {string} proof_options
* @param {string} key
* @returns {Promise<any>}
*/
module.exports.issueCredential = function (credential, proof_options, key) {
    const ptr0 = passStringToWasm0(credential, wasm.__wbindgen_malloc, wasm.__wbindgen_realloc);
    const len0 = WASM_VECTOR_LEN;
    const ptr1 = passStringToWasm0(proof_options, wasm.__wbindgen_malloc, wasm.__wbindgen_realloc);
    const len1 = WASM_VECTOR_LEN;
    const ptr2 = passStringToWasm0(key, wasm.__wbindgen_malloc, wasm.__wbindgen_realloc);
    const len2 = WASM_VECTOR_LEN;
    const ret = wasm.issueCredential(ptr0, len0, ptr1, len1, ptr2, len2);
    return takeObject(ret);
}

/**
* @param {string} credential
* @param {string} linked_data_proof_options
* @param {string} public_key
* @returns {Promise<any>}
*/
module.exports.prepareIssueCredential = function (credential, linked_data_proof_options, public_key) {
    const ptr0 = passStringToWasm0(credential, wasm.__wbindgen_malloc, wasm.__wbindgen_realloc);
    const len0 = WASM_VECTOR_LEN;
    const ptr1 = passStringToWasm0(linked_data_proof_options, wasm.__wbindgen_malloc, wasm.__wbindgen_realloc);
    const len1 = WASM_VECTOR_LEN;
    const ptr2 = passStringToWasm0(public_key, wasm.__wbindgen_malloc, wasm.__wbindgen_realloc);
    const len2 = WASM_VECTOR_LEN;
    const ret = wasm.prepareIssueCredential(ptr0, len0, ptr1, len1, ptr2, len2);
    return takeObject(ret);
}

/**
* @param {string} credential
* @param {string} preparation
* @param {string} signature
* @returns {Promise<any>}
*/
module.exports.completeIssueCredential = function (credential, preparation, signature) {
    const ptr0 = passStringToWasm0(credential, wasm.__wbindgen_malloc, wasm.__wbindgen_realloc);
    const len0 = WASM_VECTOR_LEN;
    const ptr1 = passStringToWasm0(preparation, wasm.__wbindgen_malloc, wasm.__wbindgen_realloc);
    const len1 = WASM_VECTOR_LEN;
    const ptr2 = passStringToWasm0(signature, wasm.__wbindgen_malloc, wasm.__wbindgen_realloc);
    const len2 = WASM_VECTOR_LEN;
    const ret = wasm.completeIssueCredential(ptr0, len0, ptr1, len1, ptr2, len2);
    return takeObject(ret);
}

/**
* @param {string} vc
* @param {string} proof_options
* @returns {Promise<any>}
*/
module.exports.verifyCredential = function (vc, proof_options) {
    const ptr0 = passStringToWasm0(vc, wasm.__wbindgen_malloc, wasm.__wbindgen_realloc);
    const len0 = WASM_VECTOR_LEN;
    const ptr1 = passStringToWasm0(proof_options, wasm.__wbindgen_malloc, wasm.__wbindgen_realloc);
    const len1 = WASM_VECTOR_LEN;
    const ret = wasm.verifyCredential(ptr0, len0, ptr1, len1);
    return takeObject(ret);
}

/**
* @param {string} presentation
* @param {string} proof_options
* @param {string} key
* @returns {Promise<any>}
*/
module.exports.issuePresentation = function (presentation, proof_options, key) {
    const ptr0 = passStringToWasm0(presentation, wasm.__wbindgen_malloc, wasm.__wbindgen_realloc);
    const len0 = WASM_VECTOR_LEN;
    const ptr1 = passStringToWasm0(proof_options, wasm.__wbindgen_malloc, wasm.__wbindgen_realloc);
    const len1 = WASM_VECTOR_LEN;
    const ptr2 = passStringToWasm0(key, wasm.__wbindgen_malloc, wasm.__wbindgen_realloc);
    const len2 = WASM_VECTOR_LEN;
    const ret = wasm.issuePresentation(ptr0, len0, ptr1, len1, ptr2, len2);
    return takeObject(ret);
}

/**
* @param {string} presentation
* @param {string} linked_data_proof_options
* @param {string} public_key
* @returns {Promise<any>}
*/
module.exports.prepareIssuePresentation = function (presentation, linked_data_proof_options, public_key) {
    const ptr0 = passStringToWasm0(presentation, wasm.__wbindgen_malloc, wasm.__wbindgen_realloc);
    const len0 = WASM_VECTOR_LEN;
    const ptr1 = passStringToWasm0(linked_data_proof_options, wasm.__wbindgen_malloc, wasm.__wbindgen_realloc);
    const len1 = WASM_VECTOR_LEN;
    const ptr2 = passStringToWasm0(public_key, wasm.__wbindgen_malloc, wasm.__wbindgen_realloc);
    const len2 = WASM_VECTOR_LEN;
    const ret = wasm.prepareIssuePresentation(ptr0, len0, ptr1, len1, ptr2, len2);
    return takeObject(ret);
}

/**
* @param {string} presentation
* @param {string} preparation
* @param {string} signature
* @returns {Promise<any>}
*/
module.exports.completeIssuePresentation = function (presentation, preparation, signature) {
    const ptr0 = passStringToWasm0(presentation, wasm.__wbindgen_malloc, wasm.__wbindgen_realloc);
    const len0 = WASM_VECTOR_LEN;
    const ptr1 = passStringToWasm0(preparation, wasm.__wbindgen_malloc, wasm.__wbindgen_realloc);
    const len1 = WASM_VECTOR_LEN;
    const ptr2 = passStringToWasm0(signature, wasm.__wbindgen_malloc, wasm.__wbindgen_realloc);
    const len2 = WASM_VECTOR_LEN;
    const ret = wasm.completeIssuePresentation(ptr0, len0, ptr1, len1, ptr2, len2);
    return takeObject(ret);
}

/**
* @param {string} vp
* @param {string} proof_options
* @returns {Promise<any>}
*/
module.exports.verifyPresentation = function (vp, proof_options) {
    const ptr0 = passStringToWasm0(vp, wasm.__wbindgen_malloc, wasm.__wbindgen_realloc);
    const len0 = WASM_VECTOR_LEN;
    const ptr1 = passStringToWasm0(proof_options, wasm.__wbindgen_malloc, wasm.__wbindgen_realloc);
    const len1 = WASM_VECTOR_LEN;
    const ret = wasm.verifyPresentation(ptr0, len0, ptr1, len1);
    return takeObject(ret);
}

/**
* @param {string} holder
* @param {string} linked_data_proof_options
* @param {string} key
* @returns {Promise<any>}
*/
module.exports.DIDAuth = function (holder, linked_data_proof_options, key) {
    const ptr0 = passStringToWasm0(holder, wasm.__wbindgen_malloc, wasm.__wbindgen_realloc);
    const len0 = WASM_VECTOR_LEN;
    const ptr1 = passStringToWasm0(linked_data_proof_options, wasm.__wbindgen_malloc, wasm.__wbindgen_realloc);
    const len1 = WASM_VECTOR_LEN;
    const ptr2 = passStringToWasm0(key, wasm.__wbindgen_malloc, wasm.__wbindgen_realloc);
    const len2 = WASM_VECTOR_LEN;
    const ret = wasm.DIDAuth(ptr0, len0, ptr1, len1, ptr2, len2);
    return takeObject(ret);
};

module.exports.JWKFromTezos = function (tz) {
    const ptr0 = passStringToWasm0(tz, wasm.__wbindgen_malloc, wasm.__wbindgen_realloc);
    const len0 = WASM_VECTOR_LEN;
    const ret = wasm.JWKFromTezos(ptr0, len0);
    return takeObject(ret);
};

module.exports.delegateCapability = function (capability, linked_data_proof_options, parents, key) {
    const ptr0 = passStringToWasm0(capability, wasm.__wbindgen_malloc, wasm.__wbindgen_realloc);
    const len0 = WASM_VECTOR_LEN;
    const ptr1 = passStringToWasm0(linked_data_proof_options, wasm.__wbindgen_malloc, wasm.__wbindgen_realloc);
    const len1 = WASM_VECTOR_LEN;
    const ptr2 = passStringToWasm0(parents, wasm.__wbindgen_malloc, wasm.__wbindgen_realloc);
    const len2 = WASM_VECTOR_LEN;
    const ptr3 = passStringToWasm0(key, wasm.__wbindgen_malloc, wasm.__wbindgen_realloc);
    const len3 = WASM_VECTOR_LEN;
    const ret = wasm.delegateCapability(ptr0, len0, ptr1, len1, ptr2, len2, ptr3, len3);
    return takeObject(ret);
};

module.exports.prepareDelegateCapability = function (capability, linked_data_proof_options, parents, public_key) {
    const ptr0 = passStringToWasm0(capability, wasm.__wbindgen_malloc, wasm.__wbindgen_realloc);
    const len0 = WASM_VECTOR_LEN;
    const ptr1 = passStringToWasm0(linked_data_proof_options, wasm.__wbindgen_malloc, wasm.__wbindgen_realloc);
    const len1 = WASM_VECTOR_LEN;
    const ptr2 = passStringToWasm0(parents, wasm.__wbindgen_malloc, wasm.__wbindgen_realloc);
    const len2 = WASM_VECTOR_LEN;
    const ptr3 = passStringToWasm0(public_key, wasm.__wbindgen_malloc, wasm.__wbindgen_realloc);
    const len3 = WASM_VECTOR_LEN;
    const ret = wasm.prepareDelegateCapability(ptr0, len0, ptr1, len1, ptr2, len2, ptr3, len3);
    return takeObject(ret);
};

module.exports.completeDelegateCapability = function (capability, preparation, signature) {
    const ptr0 = passStringToWasm0(capability, wasm.__wbindgen_malloc, wasm.__wbindgen_realloc);
    const len0 = WASM_VECTOR_LEN;
    const ptr1 = passStringToWasm0(preparation, wasm.__wbindgen_malloc, wasm.__wbindgen_realloc);
    const len1 = WASM_VECTOR_LEN;
    const ptr2 = passStringToWasm0(signature, wasm.__wbindgen_malloc, wasm.__wbindgen_realloc);
    const len2 = WASM_VECTOR_LEN;
    const ret = wasm.completeDelegateCapability(ptr0, len0, ptr1, len1, ptr2, len2);
    return takeObject(ret);
};

module.exports.verifyDelegation = function (delegation) {
    const ptr0 = passStringToWasm0(delegation, wasm.__wbindgen_malloc, wasm.__wbindgen_realloc);
    const len0 = WASM_VECTOR_LEN;
    const ret = wasm.verifyDelegation(ptr0, len0);
    return takeObject(ret);
};

module.exports.invokeCapability = function (invocation, target_id, linked_data_proof_options, key) {
    const ptr0 = passStringToWasm0(invocation, wasm.__wbindgen_malloc, wasm.__wbindgen_realloc);
    const len0 = WASM_VECTOR_LEN;
    const ptr1 = passStringToWasm0(target_id, wasm.__wbindgen_malloc, wasm.__wbindgen_realloc);
    const len1 = WASM_VECTOR_LEN;
    const ptr2 = passStringToWasm0(linked_data_proof_options, wasm.__wbindgen_malloc, wasm.__wbindgen_realloc);
    const len2 = WASM_VECTOR_LEN;
    const ptr3 = passStringToWasm0(key, wasm.__wbindgen_malloc, wasm.__wbindgen_realloc);
    const len3 = WASM_VECTOR_LEN;
    const ret = wasm.invokeCapability(ptr0, len0, ptr1, len1, ptr2, len2, ptr3, len3);
    return takeObject(ret);
};

module.exports.prepareInvokeCapability = function (invocation, target_id, linked_data_proof_options, public_key) {
    const ptr0 = passStringToWasm0(invocation, wasm.__wbindgen_malloc, wasm.__wbindgen_realloc);
    const len0 = WASM_VECTOR_LEN;
    const ptr1 = passStringToWasm0(target_id, wasm.__wbindgen_malloc, wasm.__wbindgen_realloc);
    const len1 = WASM_VECTOR_LEN;
    const ptr2 = passStringToWasm0(linked_data_proof_options, wasm.__wbindgen_malloc, wasm.__wbindgen_realloc);
    const len2 = WASM_VECTOR_LEN;
    const ptr3 = passStringToWasm0(public_key, wasm.__wbindgen_malloc, wasm.__wbindgen_realloc);
    const len3 = WASM_VECTOR_LEN;
    const ret = wasm.prepareInvokeCapability(ptr0, len0, ptr1, len1, ptr2, len2, ptr3, len3);
    return takeObject(ret);
};

module.exports.completeInvokeCapability = function (invocation, preparation, signature) {
    const ptr0 = passStringToWasm0(invocation, wasm.__wbindgen_malloc, wasm.__wbindgen_realloc);
    const len0 = WASM_VECTOR_LEN;
    const ptr1 = passStringToWasm0(preparation, wasm.__wbindgen_malloc, wasm.__wbindgen_realloc);
    const len1 = WASM_VECTOR_LEN;
    const ptr2 = passStringToWasm0(signature, wasm.__wbindgen_malloc, wasm.__wbindgen_realloc);
    const len2 = WASM_VECTOR_LEN;
    const ret = wasm.completeInvokeCapability(ptr0, len0, ptr1, len1, ptr2, len2);
    return takeObject(ret);
};

module.exports.verifyInvocationSignature = function (invocation) {
    const ptr0 = passStringToWasm0(invocation, wasm.__wbindgen_malloc, wasm.__wbindgen_realloc);
    const len0 = WASM_VECTOR_LEN;
    const ret = wasm.verifyInvocationSignature(ptr0, len0);
    return takeObject(ret);
};

module.exports.verifyInvocation = function (invocation, delegation) {
    const ptr0 = passStringToWasm0(invocation, wasm.__wbindgen_malloc, wasm.__wbindgen_realloc);
    const len0 = WASM_VECTOR_LEN;
    const ptr1 = passStringToWasm0(delegation, wasm.__wbindgen_malloc, wasm.__wbindgen_realloc);
    const len1 = WASM_VECTOR_LEN;
    const ret = wasm.verifyInvocation(ptr0, len0, ptr1, len1);
    return takeObject(ret);
};

function handleError(f, args) {
    try {
        return f.apply(this, args);
    } catch (e) {
        wasm.__wbindgen_exn_store(addHeapObject(e));
    }
}

function __wbg_adapter_119(arg0, arg1, arg2, arg3) {
    wasm.wasm_bindgen__convert__closures__invoke2_mut__h24c0a87f893cd9af(arg0, arg1, addHeapObject(arg2), addHeapObject(arg3));
}

module.exports.__wbindgen_string_new = function (arg0, arg1) {
    const ret = getStringFromWasm0(arg0, arg1);
    return addHeapObject(ret);
};

module.exports.__wbindgen_object_drop_ref = function (arg0) {
    takeObject(arg0);
};

module.exports.__wbindgen_cb_drop = function (arg0) {
    const obj = takeObject(arg0).original;
    if (obj.cnt-- == 1) {
        obj.a = 0;
        return true;
    }
    const ret = false;
    return ret;
};

module.exports.__wbg_fetch_6a2624d7f767e331 = function (arg0) {
    const ret = fetch(getObject(arg0));
    return addHeapObject(ret);
};

module.exports.__wbindgen_object_clone_ref = function (arg0) {
    const ret = getObject(arg0);
    return addHeapObject(ret);
};

module.exports.__wbg_fetch_693453ca3f88c055 = function (arg0, arg1) {
    const ret = getObject(arg0).fetch(getObject(arg1));
    return addHeapObject(ret);
};

module.exports.__wbg_signal_3c701f5f40a5f08d = function (arg0) {
    const ret = getObject(arg0).signal;
    return addHeapObject(ret);
};

module.exports.__wbg_new_0ae46f44b7485bb2 = function () {
    return handleError(function () {
        const ret = new AbortController();
        return addHeapObject(ret);
    }, arguments);
};

module.exports.__wbg_abort_2c4fb490d878d2b2 = function (arg0) {
    getObject(arg0).abort();
};

module.exports.__wbindgen_string_get = function (arg0, arg1) {
    const obj = getObject(arg1);
    const ret = typeof (obj) === 'string' ? obj : undefined;
    var ptr1 = isLikeNone(ret) ? 0 : passStringToWasm0(ret, wasm.__wbindgen_malloc, wasm.__wbindgen_realloc);
    var len1 = WASM_VECTOR_LEN;
    getInt32Memory0()[arg0 / 4 + 1] = len1;
    getInt32Memory0()[arg0 / 4 + 0] = ptr1;
};

module.exports.__wbg_new_7a20246daa6eec7e = function () {
    return handleError(function () {
        const ret = new Headers();
        return addHeapObject(ret);
    }, arguments);
};

module.exports.__wbg_append_aa3f462f9e2b5ff2 = function (arg0, arg1, arg2, arg3, arg4) {
    getObject(arg0).append(getStringFromWasm0(arg1, arg2), getStringFromWasm0(arg3, arg4));
};

module.exports.__wbg_instanceof_Response_4c3b1446206114d1 = function (arg0) {
    let result;
    try {
        result = getObject(arg0) instanceof Response;
    } catch (_) {
        result = false;
    }
    const ret = result;
    return ret;
};

module.exports.__wbg_url_83a6a4f65f7a2b38 = function (arg0, arg1) {
    const ret = getObject(arg1).url;
    const ptr1 = passStringToWasm0(ret, wasm.__wbindgen_malloc, wasm.__wbindgen_realloc);
    const len1 = WASM_VECTOR_LEN;
    getInt32Memory0()[arg0 / 4 + 1] = len1;
    getInt32Memory0()[arg0 / 4 + 0] = ptr1;
};

module.exports.__wbg_status_d6d47ad2837621eb = function (arg0) {
    const ret = getObject(arg0).status;
    return ret;
};

module.exports.__wbg_headers_24def508a7518df9 = function (arg0) {
    const ret = getObject(arg0).headers;
    return addHeapObject(ret);
};

module.exports.__wbg_arrayBuffer_5b2688e3dd873fed = function (arg0) {
    return handleError(function () {
        const ret = getObject(arg0).arrayBuffer();
        return addHeapObject(ret);
    }, arguments);
};

module.exports.__wbg_newwithstrandinit_f581dff0d19a8b03 = function (arg0, arg1, arg2) {
    return handleError(function () {
        const ret = new Request(getStringFromWasm0(arg0, arg1), getObject(arg2));
        return addHeapObject(ret);
    }, arguments);
};

module.exports.__wbg_crypto_58f13aa23ffcb166 = function (arg0) {
    const ret = getObject(arg0).crypto;
    return addHeapObject(ret);
};

module.exports.__wbindgen_is_object = function (arg0) {
    const val = getObject(arg0);
    const ret = typeof (val) === 'object' && val !== null;
    return ret;
};

module.exports.__wbg_process_5b786e71d465a513 = function (arg0) {
    const ret = getObject(arg0).process;
    return addHeapObject(ret);
};

module.exports.__wbg_versions_c2ab80650590b6a2 = function (arg0) {
    const ret = getObject(arg0).versions;
    return addHeapObject(ret);
};

module.exports.__wbg_node_523d7bd03ef69fba = function (arg0) {
    const ret = getObject(arg0).node;
    return addHeapObject(ret);
};

module.exports.__wbindgen_is_string = function (arg0) {
    const ret = typeof (getObject(arg0)) === 'string';
    return ret;
};

module.exports.__wbg_msCrypto_abcb1295e768d1f2 = function (arg0) {
    const ret = getObject(arg0).msCrypto;
    return addHeapObject(ret);
}

module.exports.__wbg_require_2784e593a4674877 = function () {
    return handleError(function () {
        const ret = module.require;
        return addHeapObject(ret);
    }, arguments);
};

module.exports.__wbindgen_is_function = function (arg0) {
    const ret = typeof (getObject(arg0)) === 'function';
    return ret;
};

module.exports.__wbg_randomFillSync_a0d98aa11c81fe89 = function () {
    return handleError(function (arg0, arg1) {
        getObject(arg0).randomFillSync(takeObject(arg1));
    }, arguments);
};

module.exports.__wbg_getRandomValues_504510b5564925af = function () {
    return handleError(function (arg0, arg1) {
        getObject(arg0).getRandomValues(getObject(arg1));
    }, arguments);
};

module.exports.__wbg_queueMicrotask_4d890031a6a5a50c = function (arg0) {
    queueMicrotask(getObject(arg0));
};

module.exports.__wbg_queueMicrotask_adae4bc085237231 = function (arg0) {
    const ret = getObject(arg0).queueMicrotask;
    return addHeapObject(ret);
};

module.exports.__wbg_newnoargs_c62ea9419c21fbac = function (arg0, arg1) {
    const ret = new Function(getStringFromWasm0(arg0, arg1));
    return addHeapObject(ret);
};

module.exports.__wbg_next_9b877f231f476d01 = function (arg0) {
    const ret = getObject(arg0).next;
    return addHeapObject(ret);
};

module.exports.__wbg_next_6529ee0cca8d57ed = function () {
    return handleError(function (arg0) {
        const ret = getObject(arg0).next();
        return addHeapObject(ret);
    }, arguments);
};

module.exports.__wbg_done_5fe336b092d60cf2 = function (arg0) {
    const ret = getObject(arg0).done;
    return ret;
};

module.exports.__wbg_value_0c248a78fdc8e19f = function (arg0) {
    const ret = getObject(arg0).value;
    return addHeapObject(ret);
};

module.exports.__wbg_iterator_db7ca081358d4fb2 = function () {
    const ret = Symbol.iterator;
    return addHeapObject(ret);
};

module.exports.__wbg_get_7b48513de5dc5ea4 = function () {
    return handleError(function (arg0, arg1) {
        const ret = Reflect.get(getObject(arg0), getObject(arg1));
        return addHeapObject(ret);
    }, arguments);
};

module.exports.__wbg_call_90c26b09837aba1c = function () {
    return handleError(function (arg0, arg1) {
        const ret = getObject(arg0).call(getObject(arg1));
        return addHeapObject(ret);
    }, arguments);
};

module.exports.__wbg_new_9fb8d994e1c0aaac = function () {
    const ret = new Object();
    return addHeapObject(ret);
};

module.exports.__wbg_self_f0e34d89f33b99fd = function () {
    return handleError(function () {
        const ret = self.self;
        return addHeapObject(ret);
    }, arguments);
};

module.exports.__wbg_window_d3b084224f4774d7 = function () {
    return handleError(function () {
        const ret = window.window;
        return addHeapObject(ret);
    }, arguments);
};

module.exports.__wbg_globalThis_9caa27ff917c6860 = function () {
    return handleError(function () {
        const ret = globalThis.globalThis;
        return addHeapObject(ret);
    }, arguments);
};

module.exports.__wbg_global_35dfdd59a4da3e74 = function () {
    return handleError(function () {
        const ret = global.global;
        return addHeapObject(ret);
    }, arguments);
};

module.exports.__wbindgen_is_undefined = function (arg0) {
    const ret = getObject(arg0) === undefined;
    return ret;
};

module.exports.__wbg_call_5da1969d7cd31ccd = function () {
    return handleError(function (arg0, arg1, arg2) {
        const ret = getObject(arg0).call(getObject(arg1), getObject(arg2));
        return addHeapObject(ret);
    }, arguments);
};

module.exports.__wbg_getTime_9272be78826033e1 = function (arg0) {
    const ret = getObject(arg0).getTime();
    return ret;
};

module.exports.__wbg_new0_622c21a64f3d83ea = function () {
    const ret = new Date();
    return addHeapObject(ret);
};

module.exports.__wbg_new_60f57089c7563e81 = function (arg0, arg1) {
    try {
        var state0 = { a: arg0, b: arg1 };
        var cb0 = (arg0, arg1) => {
            const a = state0.a;
            state0.a = 0;
            try {
                return __wbg_adapter_119(a, state0.b, arg0, arg1);
            } finally {
                state0.a = a;
            }
        };
        const ret = new Promise(cb0);
        return addHeapObject(ret);
    } finally {
        state0.a = state0.b = 0;
    }
};

module.exports.__wbg_resolve_6e1c6553a82f85b7 = function (arg0) {
    const ret = Promise.resolve(getObject(arg0));
    return addHeapObject(ret);
};

module.exports.__wbg_then_3ab08cd4fbb91ae9 = function (arg0, arg1) {
    const ret = getObject(arg0).then(getObject(arg1));
    return addHeapObject(ret);
};

module.exports.__wbg_then_8371cc12cfedc5a2 = function (arg0, arg1, arg2) {
    const ret = getObject(arg0).then(getObject(arg1), getObject(arg2));
    return addHeapObject(ret);
};

module.exports.__wbg_buffer_a448f833075b71ba = function (arg0) {
    const ret = getObject(arg0).buffer;
    return addHeapObject(ret);
};

module.exports.__wbg_newwithbyteoffsetandlength_d0482f893617af71 = function (arg0, arg1, arg2) {
    const ret = new Uint8Array(getObject(arg0), arg1 >>> 0, arg2 >>> 0);
    return addHeapObject(ret);
};

module.exports.__wbg_new_8f67e318f15d7254 = function (arg0) {
    const ret = new Uint8Array(getObject(arg0));
    return addHeapObject(ret);
};

module.exports.__wbg_set_2357bf09366ee480 = function (arg0, arg1, arg2) {
    getObject(arg0).set(getObject(arg1), arg2 >>> 0);
};

module.exports.__wbg_length_1d25fa9e4ac21ce7 = function (arg0) {
    const ret = getObject(arg0).length;
    return ret;
};

module.exports.__wbg_newwithlength_6c2df9e2f3028c43 = function (arg0) {
    const ret = new Uint8Array(arg0 >>> 0);
    return addHeapObject(ret);
};

module.exports.__wbg_subarray_2e940e41c0f5a1d9 = function (arg0, arg1, arg2) {
    const ret = getObject(arg0).subarray(arg1 >>> 0, arg2 >>> 0);
    return addHeapObject(ret);
};

module.exports.__wbg_has_9c711aafa4b444a2 = function () {
    return handleError(function (arg0, arg1) {
        const ret = Reflect.has(getObject(arg0), getObject(arg1));
        return ret;
    }, arguments);
};

module.exports.__wbg_set_759f75cd92b612d2 = function () {
    return handleError(function (arg0, arg1, arg2) {
        const ret = Reflect.set(getObject(arg0), getObject(arg1), getObject(arg2));
        return ret;
    }, arguments);
};

module.exports.__wbg_stringify_e1b19966d964d242 = function () {
    return handleError(function (arg0) {
        const ret = JSON.stringify(getObject(arg0));
        return addHeapObject(ret);
    }, arguments);
};

module.exports.__wbindgen_debug_string = function (arg0, arg1) {
    const ret = debugString(getObject(arg1));
    const ptr1 = passStringToWasm0(ret, wasm.__wbindgen_malloc, wasm.__wbindgen_realloc);
    const len1 = WASM_VECTOR_LEN;
    getInt32Memory0()[arg0 / 4 + 1] = len1;
    getInt32Memory0()[arg0 / 4 + 0] = ptr1;
};

module.exports.__wbindgen_throw = function (arg0, arg1) {
    throw new Error(getStringFromWasm0(arg0, arg1));
};

module.exports.__wbindgen_memory = function () {
    const ret = wasm.memory;
    return addHeapObject(ret);
};

module.exports.__wbindgen_closure_wrapper11899 = function (arg0, arg1, arg2) {
    const ret = makeMutClosure(arg0, arg1, 3265, __wbg_adapter_26);
    return addHeapObject(ret);
};

// const path = require('path').join(__dirname, 'didkit_wasm_bg.wasm');
// const bytes = require('fs').readFileSync(path);

// const wasmModule = new WebAssembly.Module(bytes);
// const wasmInstance = new WebAssembly.Instance(wasmModule, imports);
// wasm = wasmInstance.exports;
// module.exports.__wasm = wasm;
const path = '/didkit_wasm_bg.wasm';  // public フォルダ内のパス

// ブラウザ環境かどうかをチェック
if (typeof window === 'undefined') {
    // Node.js 環境の場合
    const fs = require('fs');
    const fullPath = require('path').join(__dirname, 'didkit_wasm_bg.wasm');
    const bytes = fs.readFileSync(fullPath);
    initializeWasm(bytes);
} else {
    // ブラウザ環境の場合
    fetchWasm(path);
}

async function fetchWasm(path) {
    const response = await fetch(path);
    const buffer = await response.arrayBuffer();
    const bytes = new Uint8Array(buffer);
    initializeWasm(bytes);
}

function initializeWasm(bytes) {
    const wasmModule = new WebAssembly.Module(bytes);
    const wasmInstance = new WebAssembly.Instance(wasmModule, imports);
    wasm = wasmInstance.exports;
    module.exports.__wasm = wasm;
}
