---
title: Normalization up to BCNF, and when to denormalize on purpose
date: 2026-08-06
tags:
  - Databases
description: A simple walk through 1NF, 2NF, 3NF and BCNF, and the trade-offs of normalization
published: true
translationOf: normalizacao-ate-fnbc-e-quando-desnormalizar-de-proposito
---
## Anomalies

First of all, it is worth pointing out that normalization exists to avoid insertion, update and deletion anomalies. These anomalies happen when the database has poorly defined tables and attributes, which ends up creating unnecessary redundancy.

> Example table: BOOK(++book_id++, title, author_id, author_name)

- Insertion anomaly: when one attribute prevents the insertion of data belonging to another attribute that is logically independent of it. For example: you cannot register a newly hired author before they have at least one book recorded.
- Update anomaly: if multiple books by the same author have been registered, updating the author's name means updating every row of the table, or the author ends up recorded under different names.
- Deletion anomaly: if an author has only 1 book registered, deleting the book makes us lose the author's information.

## First Normal Form (1NF)

The first NF is quite simple. It states that, for a table to be in 1NF, the domain of possible values of an attribute must represent an atomic piece of data (not divisible). For example, the value "12345" is atomic, but the value "X Street, 123, ZIP 76543123" is not. On top of that, a table in 1NF must not have multivalued attributes and must necessarily have a primary key.



## Second Normal Form (2NF)

This one is about tables with a composite primary key. The idea is that every table with a composite PK in 2NF must have all of its attributes depending on the two or more attributes that make up the key.

> Example table: ORDER_ITEM(++order_id++, ++product_id++, quantity, product_name)

Note that in the example table we have two non key fields: quantity and product_name.

- *quantity*: a field that depends on both key attributes to make sense.
- *product_name*: a field that depends only on *product_id* to make sense. The presence of *order_id* does not change the value of *product_name*.

In this context, we say that *product_name* has a **partial dependency** on the PK. For a table to be in 2NF, it must meet two criteria: be in 1NF and have no partial dependencies.

To remove the partial dependency you move the fields that have this kind of dependency into a new table, leaving the new version like this in relation to the *Example table* above:

- ORDER_ITEM(++order_id++, quantity, product_id (FK))
- PRODUCT(++product_id++, product_name)



## Third Normal Form (3NF)

In 3NF the focus is the analysis of the non key attributes of a table. It is violated when one or more non key attributes determine the value of another non key attribute.

> Example table: SALE(++invoice_number++, seller_code, seller_name, product_code, quantity)

Note that in the example table the value of the *seller_name* field is defined directly by the value of the *seller_code* field, and not by the PK directly. In this context, we say that *seller_name* has a **transitive dependency** on the PK. For a table to be in 3NF, it must first be in 2NF and have no transitive dependencies.

To remove the transitive dependency you move the fields that have this kind of dependency into a new table, leaving the new version like this in relation to the *Example table* above:

- SALE(++invoice_number++, product_code, quantity, seller_code (FK))
- SELLER(++seller_code++, seller_name)



## Boyce-Codd Normal Form (BCNF)

To violate this normal form we have a slightly trickier little rule, but I am going to try to simplify it.

> Candidate key: a set of one or more attributes that can uniquely identify a row of the table. A candidate key behaves very much like a primary key.

With the concept of candidate key above well defined, it is now easier to understand BCNF. The idea is: if a table has a set X made of 1 or more attributes, and that X directly determines the value of another attribute in the same table, then the original set X must be a candidate key. Otherwise, the table is not in BCNF.

> Example table: ADVISING(++student_id++, subject, professor)
>
> (Assuming each subject can have only one professor)

Following the idea of the example table above, we have the attribute subject determining the value of the attribute professor directly. On top of that, subject on its own is not strong enough to uniquely identify a row of this table. So, BCNF violated.

To remove this kind of violation we move the fields that have this kind of behavior into a new table, leaving the new version like this in relation to the *Example table* above:

- ADVISING(++student_id++, subject (FK))
- SUBJECT(++subject++, professor)



## When not to normalize on purpose

The idea behind normalization is to avoid unnecessary redundancy and prevent anomalies that can cause inconsistencies, since after all a duplicated piece of data is, in practice, an inconsistency waiting to happen. On the other hand, normalization also creates the need to run several JOINs to fetch a piece of information, and each JOIN has a cost that grows along with the volume of data. That said, a normalized database can end up losing read performance to a non normalized one, especially when those queries repeat at large scale. In contrast, a normalized database avoids unnecessary repetition of data, which improves write time and guarantees that each piece of information exists in a single trustworthy place.

Finally, for cases where we have systems that read in large volumes and do not need as much writing, a less normalized database would be the better choice, trading part of that safety for speed where it actually matters.
