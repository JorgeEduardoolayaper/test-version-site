<template>
    <tr>
        <td>
            <b>{{label}} </b>
            <span 
                class="float-right" 
                v-show="!editing"> 
                {{value}}
                <button class="btn btn-light btn-rounder" @click="editing=true">
                    Edit
                </button>
            </span>
            <span class="float-right" v-show="editing" >
                <div style="display: flex;">
                    <input :value="value"
                            @input="$emit('input', $event.target.value)"
                            type="text" 
                            class="form-control" >
                    <button class="btn btn-light btn-rounder" @click="editing=false">
                        Cancel
                    </button>
                </div>
            </span>
        </td>
    </tr>
</template>
<script lang="ts">
import Vue from "vue";

export default Vue.extend({
    name: "UserPersonalInfoEdit",
    
    props:["label", "value", "errors"],

    data() {
        return {
            editing: false,
        };
    },

    computed: {

    },

    methods: {

    },
});
</script>