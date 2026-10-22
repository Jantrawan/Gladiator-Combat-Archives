import sys
from neo4j import GraphDatabase

password = "9y0bZ4bLP4w-hAFPWE8-cATtHKImvRO25rv1IRT_fbY"

candidates = [
    ("neo4j+s://6aa638c7.databases.neo4j.io", "neo4j"),
    ("neo4j+s://6aa638c7.databases.neo4j.io", "6aa638c7"),
    ("bolt+s://6aa638c7.databases.neo4j.io", "neo4j"),
    ("bolt+s://6aa638c7.databases.neo4j.io", "6aa638c7"),
    ("bolt://localhost:7687", "neo4j"),
    ("bolt://localhost:7687", "6aa638c7"),
]

query = "MATCH (n)-[r]->(m) RETURN n, r, m LIMIT 25"

found = False
for uri, user in candidates:
    print(f"Testing URI: {uri} with user: {user}...")
    try:
        driver = GraphDatabase.driver(uri, auth=(user, password), connection_timeout=5.0)
        with driver.session() as session:
            result = session.run(query)
            records = list(result)
            print(f"SUCCESS! Retrieved {len(records)} records from {uri} with user {user}")
            for r in records[:3]:
                print("Record:", r)
            found = True
            driver.close()
            break
    except Exception as e:
        print(f"Failed with {e.__class__.__name__}: {e}")

if not found:
    print("Could not connect with predefined combinations.")
