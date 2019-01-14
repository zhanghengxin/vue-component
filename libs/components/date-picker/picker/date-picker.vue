<template>
    <div ref="picker" :class="wrapperCls" v-clickoutside="closePopup">
        <b-input
            ref="input"
            :label="labelText"
            :fixed="fixed"
            type="text"
            :class="inputClass"
            :style="inputStyle"
            :name="inputName"
            :disabled="disabled"
            :readonly="!editable"
            :value="text"
            :labelWidth="width"
            :size="size"
            suffix
            clearable
            icon="rili"
            :placeholder="innerPlaceholder"
            @input="handleInput"
            @on-change="handleChange"
            @on-focus="showPopup">
        </b-input>
        <transition name='slide'>
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
                        @select-date="selectDate">
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
                            @select-date="selectStartDate">
                        </panel>
                        <panel
                            v-bind="$attrs"
                            :type="innerType"
                            :date-format="innnerDateFormat"
                            :value="curVal[1]"
                            :start-at="curVal[0]"
                            :end-at="null"
                            :visible="popupVisible"
                            @select-date="selectEndDate">
                        </panel>
                    </div>
                </div>
                <slot name="footer" :confirm="confirmDate">
                    <div v-if="confirm" :class="footerCls">
                        <b-button
                            @on-click="confirmDate">
                            {{ confirmText }}
                        </b-button>
                    </div>
                </slot>
            </div>
        </transition>
    </div>
</template>

<script>
import picker from '../mixins/picker'
import Emitter from '../../../mixins/emitter'
import { prefix } from '../../../utils/common'

export default {
    name: `${prefix}datepicker`,
    mixins: [ picker, Emitter ],
    props: {
        format: {
            type: String,
            default: 'YYYY-MM-DD'
        },
        type: {
            type: String,
            default: 'date'
        }
    }
}
</script>
