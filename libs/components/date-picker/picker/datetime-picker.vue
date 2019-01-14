<template>
    <div ref="picker" :class="wrapperCls" v-clickoutside="closePopup">
        <b-input
            ref="input"
            :label="labelText"
            :fixed="fixed"
            type="text"
            :class="inputClass"
            :name="inputName"
            :disabled="disabled"
            :readonly="!editable"
            :value="text"
            :labelWidth="width"
            :size="size"
            suffix
            clearable
            icon="rili"
            :style="inputStyle"
            :placeholder="innerPlaceholder"
            @input="handleInput"
            @on-change="handleChange"
            @on-focus="showPopup">
        </b-input>
        <transition name="slide">
            <div
                v-show="popupVisible"
                :class="popupCls"
                ref="calendar">
                <div :class="popupTopCls">
                    <slot name="header">
                        <div
                            v-if="range && innerShortcuts.length"
                            :class="shortcutsWrapper">
                            <button
                                type="button"
                                :class="shortcutsCls"
                                v-for="(range, index) in innerShortcuts"
                                :key="index"
                                @click="selectRange(range)">
                                {{range.text}}
                            </button>
                        </div>
                        <div
                            v-if="!range && innerShortcuts.length"
                            :class="shortcutsWrapper">
                            <button
                                type="button"
                                :class="shortcutsCls"
                                v-for="(range, index) in innerRangeShortcuts"
                                :key="index"
                                @click="selectRange(range)">
                                {{range.text}}
                            </button>
                        </div>
                    </slot>
                    <panel
                        v-if="!range"
                        :type="innerType"
                        :date-format="innnerDateFormat"
                        :value="curVal"
                        :visible="popupVisible"
                        @select-date="selectDate"
                        @select-time="selectTime">
                    </panel>
                    <div v-else :class="rangeWrapper">
                        <panel
                            style="box-shadow: 1px 0 rgba(0, 0, 0, .1)"
                            v-bind="$attrs"
                            :type="innerType"
                            :date-format="innnerDateFormat"
                            :value="curVal[0]"
                            :start-at="null"
                            :end-at="curVal[1]"
                            :visible="popupVisible"
                            @select-date="selectStartDate"
                            @select-time="selectStartTime">
                        </panel>
                        <panel
                            v-bind="$attrs"
                            :type="innerType"
                            :date-format="innnerDateFormat"
                            :value="curVal[1]"
                            :start-at="curVal[0]"
                            :end-at="null"
                            :visible="popupVisible"
                            @select-date="selectEndDate"
                            @select-time="selectEndTime">
                        </panel>
                    </div>
                </div>
                <slot name="footer" :confirm="confirmDate">
                    <div v-if="confirm" :class="footerCls">
                        <button @on-click="confirmDate">
                            {{ confirmText }}
                        </button>
                    </div>
                </slot>
            </div>
        </transition>
    </div>
</template>

<script>
import picker from '../mixins/picker'
import { prefix } from '../../../utils/common'

export default {
    name: `${prefix}datetimepicker`,
    mixins: [ picker ],
    props: {
        format: {
            type: String,
            default: 'YYYY-MM-DD HH:mm:ss'
        },
        type: {
            type: String,
            default: 'datetime'
        }
    }
}
</script>
