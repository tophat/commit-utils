declare module 'junit-report-builder' {
    interface TestCase {
        name(v: string): TestCase
        failure(message: string, type?: string): void
        skipped(): void
        className(name: string): TestCase
    }

    interface TestSuite {
        name(v: string): TestSuite
        testCase(): TestCase
    }

    interface Builder {
        testSuite(): TestSuite
        build(): string
        writeTo(filename: string): void
    }

    const builder: Builder

    export default builder
}
