let pc = new RTCPeerConnection();

async function createOffer() {
    console.log("Sending offer request");

    const offerResponse = await fetch("/offer", {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            sdp: "",
            type: "offer"
        }),
    });

    const offer = await offerResponse.json();
    console.log("Received offer response", offer);

    await pc.setRemoteDescription(new RTCSessionDescription(offer));

    const answer = await pc.createAnswer();
    await pc.setLocalDescription(answer);
}

createOffer();
