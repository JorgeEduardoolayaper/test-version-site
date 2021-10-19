<template>
    <div class="dropdown" :class="[isnotround ? 'notRound' : '']">
        <div class="form__control mySelect">
            <input
                :class="[cssoverride ? 'input__ext' : 'input']"
                type="text"
                :value="selectedVal ? selectedVal : 'All'"
                readonly="readonly"
            />
            <div class="form__control__icon--right">
                <i class="fa fa-angle-down"></i>
            </div>
        </div>
        <div
            :class="[cssoverride ? 'dropdown__content__ex' : 'dropdown__content']"
            style="z-index: 1000;"
        >
            <div
                :class="[
                    cssoverride ? 'dropdown__content__ex__item__ex' : 'dropdown__content__item',
                ]"
                v-for="option in options"
                :key="option.id"
                @click="handleSelectOption(option)"
            >
                {{ option.name }}
                <i
                    class="icon icon--smaller icon--check icon--color--yellow-1"
                    v-if="isSelectedOption(option)"
                ></i>
            </div>
        </div>
    </div>
</template>

<script lang="ts">
import Vue, { PropOptions } from "vue";
import Multiselect from "vue-multiselect";
import { SelectOption } from "../../general/types/types";

export default Vue.extend({
    name: "MultiSelect",
    components: { Multiselect },
    inheritAttrs: false,

    props: {
        options: Array as PropOptions<SelectOption[]>,
        value: String,
        cssoverride: Boolean,
        isnotround: Boolean,
    },

    model: {
        prop: "value",
        event: "change",
    },

    data() {
        return {
            selectedVal: "" as string | null,
        };
    },

    computed: {
        formattedValue(): SelectOption | null {
            return this.options.find(option => option.id === this.value) ?? null;
        },
    },

    methods: {
        handleSelectOption(val: SelectOption): void {
            this.selectedVal = val.id;
            this.$emit("change", val.id);
        },

        isSelectedOption(val: SelectOption): boolean {
            if (!this.selectedVal && val.id === null) return true;
            return this.selectedVal === val.id;
        },
    },
});
</script>
<style lang="scss" scoped>
.mySelect {
    input {
        background: #f3f7fc;
        border-radius: 40px;
        border: none;

        &::placeholder {
            font-style: italic;
            font-weight: 400;
        }
    }
}
.dropdown__content__ex__item__ex {
    font-size: 12px;
    i {
        font-size: 18px;
    }
}
.notRound {
    input {
        border-radius: 7px;
        background: #f4f4f4;
        padding: 25px;
        color: black;
    }
    .dropdown__content {
        background: white;
    }
    .dropdown__content__item {
        color: black;
        &:hover {
            background: #f4f4f4;
        }
    }
}
</style>
