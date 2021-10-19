<template>
    <div v-if="isDataLoaded">
       <PolarArea
            :series=data
            :options=options
            type="polarArea"
            :isHorizontal=true
            :title="title"
            :showYAxis=true
            
       />
    </div>
</template>

<script lang="ts">
import Vue from "vue";
import PolarArea from "../../chart/PolarArea.vue";

export default Vue.extend({
  components: { PolarArea },
    name: "LeagueWinLossWidget",

    props: {
        isDataLoaded: Boolean,
        sportNames: {
            type: Array,
            required: true,
        },
        sports: {
            type: Map,
            default: new Map(),
        },
    },

    data() {
        return {
            height:230,
            titleColor: "#E6005C",
            subtitleColor: "#000",
        }
    },

    computed: { 
        labelsXaxis(): string[] {
            return this.sportNames as string[];
        },
        
        data(): number[] {
            const data:number[] = [];
            for (var index in this.sportNames) {
                if(this.sports.get(this.sportNames[index]) !== undefined && 
                   this.sports.get(this.sportNames[index]).get("totalWins") !== undefined) {
                    data.push(
                        this.roundToTwo(
                            (this.sports.get(this.sportNames[index]).get("totalWins") / 
                                this.sports.get(this.sportNames[index]).get("total")) * 100)
                            );
                }
            }
            return data;  
        },

        options(): any {
            let options =  
            {
                name: "League WinLoss",
                labels: this.labelsXaxis,
                title: this.title,
                subtitle: {text: "", color: this.subtitleColor}
            };
            return options;
        },

        title(): any {
            return {
                text: "Win/Loss Percentage",
                color: this.titleColor,
            }
        },
    },
    methods: { 
        roundToTwo(num: number): number {    
            return Math.round((num + Number.EPSILON) * 100) / 100;
        },
    },             
});
</script>