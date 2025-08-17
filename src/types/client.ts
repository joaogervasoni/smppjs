import {
    BindTransceiverParams,
    BindReceiverParams,
    BindTransmitterParams,
    SubmitSmParams,
    DataSmParams,
    QuerySmParams,
    CancelSmParams,
    ReplaceSmParams,
    DeliverSmRespParams,
} from '.';

export interface IClient {
    /**
     * Connect to the SMPP server
     *
     * @param url - The URL of the SMPP server
     * @example
     * ```typescript
     * client.connect({ url: 'localhost:2775' });
     * ```
     */
    connect({ url }: { url: string }): void;

    /**
     * Disconnect from the SMPP server
     *
     * @returns true if the PDU was successfully queued for transmission, false otherwise
     * @example
     * ```typescript
     * client.disconnect();
     * ```
     */
    disconnect(): boolean;

    /**
     *
     * @param eventName
     * @param callback
     */
    on(eventName: 'connect' | 'close' | 'error' | 'timeout' | 'debug' | 'data' | 'pdu' | 'readable', callback: (...args: unknown[]) => void): void;

    /**
     * Establishes a bidirectional SMPP session (both transmit and receive capabilities).
     * This PDU allows an ESME to bind as both a transmitter and receiver with a single operation.
     *
     * @param params - Bind transceiver parameters including system_id, password, and addressing information
     * @returns true if the PDU was successfully queued for transmission, false otherwise
     *
     * @example
     * ```typescript
     * client.bindTransceiver({
     *   systemId: 'ESME_SYSTEM',
     *   password: 'password123',
     *   systemType: 'SMPP'
     * });
     * ```
     */
    bindTransceiver(params: BindTransceiverParams): boolean;

    /**
     * Establishes a receive-only SMPP session.
     * This PDU allows an ESME to bind to the SMSC for receiving messages (deliver_sm operations).
     *
     * @param params - Bind receiver parameters including system_id, password, and addressing information
     * @returns true if the PDU was successfully queued for transmission, false otherwise
     *
     * @example
     * ```typescript
     * client.bindReceiver({
     *   systemId: 'RECEIVER_SYSTEM',
     *   password: 'password123',
     *   systemType: 'SMPP'
     * });
     * ```
     */
    bindReceiver(params: BindReceiverParams): boolean;

    /**
     * Establishes a transmit-only SMPP session.
     * This PDU allows an ESME to bind to the SMSC for sending messages (submit_sm operations).
     *
     * @param params - Bind transmitter parameters including system_id, password, and addressing information
     * @returns true if the PDU was successfully queued for transmission, false otherwise
     *
     * @example
     * ```typescript
     * client.bindTransmitter({
     *   systemId: 'TRANSMITTER_SYSTEM',
     *   password: 'password123',
     *   systemType: 'SMPP'
     * });
     * ```
     */
    bindTransmitter(params: BindTransmitterParams): boolean;

    /**
     * Submits a short message for delivery to a mobile station.
     * This is the primary PDU for sending SMS messages through the SMPP protocol.
     *
     * @param params - Submit SM parameters including destination address, message content, and delivery options
     * @returns true if the PDU was successfully queued for transmission, false otherwise
     *
     * @example
     * ```typescript
     * client.submitSm({
     *   destinationAddr: '1234567890',
     *   dataCoding: 0x00,
     *   esmClass: 0x00,
     *   shortMessage: {
     *     message: 'Hello World!',
     *     encoding: 'ascii'
     *   }
     * });
     * ```
     */
    submitSm(params: SubmitSmParams): boolean;

    /**
     * Submits a data message for delivery.
     * This PDU is used for sending data messages that may not fit the traditional SMS format,
     * supporting larger payloads through optional TLV parameters.
     *
     * @param params - Data SM parameters including destination address and message payload
     * @returns true if the PDU was successfully queued for transmission, false otherwise
     *
     * @example
     * ```typescript
     * client.dataSm({
     *   destinationAddr: '1234567890',
     *   dataCoding: 0x00,
     *   esmClass: 0x00
     * });
     * ```
     */
    dataSm(params: DataSmParams): boolean;

    /**
     * Queries the status of a previously submitted message.
     * This PDU allows an ESME to query the SMSC for the current status of a message
     * that was previously submitted using submit_sm.
     *
     * @param params - Query SM parameters including message_id and source address
     * @returns true if the PDU was successfully queued for transmission, false otherwise
     *
     * @example
     * ```typescript
     * client.querySm({
     *   messageId: 'msg123456',
     *   sourceAddr: '1234567890'
     * });
     * ```
     */
    querySm(params: QuerySmParams): boolean;

    /**
     * Cancels a previously submitted message.
     * This PDU allows an ESME to cancel a message that was previously submitted
     * but has not yet been delivered to the destination.
     *
     * @param params - Cancel SM parameters including message_id and destination address
     * @returns true if the PDU was successfully queued for transmission, false otherwise
     *
     * @example
     * ```typescript
     * client.cancelSm({
     *   messageId: 'msg123456',
     *   destinationAddr: '1234567890'
     * });
     * ```
     */
    cancelSm(params: CancelSmParams): boolean;

    /**
     * Replaces a previously submitted message with a new message.
     * This PDU allows an ESME to replace the content of a message that was previously
     * submitted but has not yet been delivered to the destination.
     *
     * @param params - Replace SM parameters including message_id, new message content, and addressing
     * @returns true if the PDU was successfully queued for transmission, false otherwise
     *
     * @example
     * ```typescript
     * client.replaceSm({
     *   messageId: 'msg123456',
     *   destinationAddr: '1234567890',
     *   shortMessage: 'Updated message content'
     * });
     * ```
     */
    replaceSm(params: ReplaceSmParams): boolean;

    /**
     * Acknowledges the receipt of a deliver_sm PDU.
     * This PDU is sent in response to a deliver_sm PDU received from the SMSC,
     * confirming successful receipt and processing of the delivered message.
     *
     * @param params - Deliver SM response parameters including message_id and command_status
     * @returns true if the PDU was successfully queued for transmission, false otherwise
     *
     * @example
     * ```typescript
     * client.deliverSmResp({
     *   messageId: 'delivered_msg_123'
     * });
     * ```
     */
    deliverSmResp(params: DeliverSmRespParams): boolean;

    /**
     * Sends a link verification request to maintain the SMPP session.
     * This PDU is used to verify that the SMPP session is still active and functioning.
     * It's typically sent periodically to prevent session timeouts.
     *
     * @returns true if the PDU was successfully queued for transmission, false otherwise
     *
     * @example
     * ```typescript
     * // Manual enquire_link
     * client.enquireLink();
     *
     * // Or enable automatic enquire_link in constructor:
     * const client = new Client({
     *   interfaceVersion: 80,
     *   enquireLink: { auto: true, interval: 30000 }
     * });
     * ```
     */
    enquireLink(): boolean;

    /**
     * Terminates the SMPP session gracefully.
     * This PDU is used to properly close the SMPP session by notifying the SMSC
     * that the ESME wishes to terminate the connection.
     *
     * @returns true if the PDU was successfully queued for transmission, false otherwise
     *
     * @example
     * ```typescript
     * // Gracefully close the session before disconnecting
     * client.unbind();
     *
     * // Listen for unbind_resp before calling disconnect()
     * client.on('unbind_resp', () => {
     *   client.disconnect();
     * });
     * ```
     */
    unbind(): boolean;
}
