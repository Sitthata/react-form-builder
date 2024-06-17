interface Block {
    id: string
    type: string
    label: string
}

interface ChoiceBlock extends Block {
    choices: Choice[]
}

interface Choice {
    id: string
    label: string
    value: string
}