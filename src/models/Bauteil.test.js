import { Bauteil } from "./Bauteil"

it("Test creation of Bauteil", () => {
    const außenwand = Bauteil.create({
        id: '1',
        Kurzbezeichner: "AW",
        uWert: 1.3
    })

    expect(außenwand).toBeDefined()
    expect(außenwand.isDoorOrWindow).toBeFalsy()
    expect(außenwand.isExterior).toBeTruthy()
    expect(außenwand.isHorizontal).toBeFalsy()
    expect(außenwand.Kommentar).toBe("")
})

it("Test creation of Bauteil", () => {
    const fußboden = Bauteil.create({
        id: '1',
        Kurzbezeichner: "FB",
        uWert: 1.3
    })

    expect(fußboden).toBeDefined()
    expect(fußboden.isDoorOrWindow).toBeFalsy()
    expect(fußboden.isExterior).toBeFalsy()
    expect(fußboden.isInterior).toBeFalsy()
    expect(fußboden.isHorizontal).toBeTruthy()
})