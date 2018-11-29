<template>
    <div
        :class="wrapperCls"
        v-clickoutside="closePopup">
        <div
            :class="inputWrapper"
            @click="showPopup">
            <b-input
                ref="input"
                :label="innerLabel"
                :fixed="fixed"
                type="text"
                autocomplete="off"
                :class="inputClass"
                :name="inputName"
                :disabled="disabled"
                :readonly="!editable"
                :value="text"
                :labelWidth="width"
                :size="size"
                :style="inputStyle"
                :placeholder="innerPlaceholder"
                @input="handleInput"
                @change="handleChange">
            </b-input>
            <span :class="inputAppend">
                <slot name="calendar-icon">
                    <svg xmlns="http://www.w3.org/2000/svg" version="1.1" viewBox="0 0 200 200" :class="calendarIcon">
                        <rect x="13" y="29" rx="14" ry="14" width="174" height="158" fill="transparent" />
                        <line x1="46" x2="46" y1="8" y2="50" />
                        <line x1="154" x2="154" y1="8" y2="50" />
                        <line x1="13" x2="187" y1="70" y2="70" />
                        <text
                            x="50%"
                            y="135"
                            font-size="90"
                            stroke-width="1"
                            text-anchor="middle"
                            dominant-baseline="middle">
                            {{ new Date().getDate() }}
                        </text>
                    </svg>
                </slot>
            </span>
            <span
                v-if="showClearIcon"
                :class="clearWrapper"
                @click.stop="clearDate">
                <slot name="b-clear-icon">
                    <i :class="clearInner"></i>
                </slot>
            </span>
        </div>
        <div
            v-show="popupVisible"
            :class="popupCls"
            :style="innerPopupStyle"
            ref="calendar">
            <panel
                v-if="!range"
                :type="innerType"
                :date-format="innnerDateFormat"
                :value="curVal"
                :visible="popupVisible"
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
                    @select-time="selectEndTime">
                </panel>
            </div>
            <slot name="footer" :confirm="confirmDate">
                <div v-if="confirm" :class="footerCls">
                    <button
                        type="button"
                        :class="confirmCls"
                        @click="confirmDate">
                        {{ confirmText }}
                    </button>
                </div>
            </slot>
        </div>
    </div>
</template>

<script>
import picker from '../mixins/picker'

export default {
    name: 'b-timepicker',
    mixins: [ picker ],
    props: {
        format: {
            type: String,
            default: 'HH:mm:ss'
        },
        type: {
            type: String,
            default: 'time'
        }
    }
}
</script>
