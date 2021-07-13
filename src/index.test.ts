import { Sophos } from '.'

describe('Sophos class', () => {
    it('creates a Sophos instance', () => {
        const sophos = new Sophos({
            clientId: '1234',
            clientSecret: 'asdf',
        })

        expect(sophos).toBeInstanceOf(Sophos)
    })
})
