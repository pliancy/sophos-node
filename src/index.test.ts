import { Sophos } from '.'

describe('TimelyApp class', () => {
  it('creates a TimelyApp instance', () => {
    const sophos = new Sophos({
      clientId: '1234',
      clientSecret: 'asdf',
    })

    expect(sophos).toBeInstanceOf(Sophos)
  })
})
