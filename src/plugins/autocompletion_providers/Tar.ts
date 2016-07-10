import {PluginManager} from "../../PluginManager";
import {shortFlag, longFlag, mapSuggestions, combine} from "./Common";
import {mapObject} from "../../utils/Common";

const options = combine(mapObject(
    {
        f: {
            short: "File to extract or archive as: -f file",
            long: "Read the archive from or write the archive to the specified file.\
               The filename can be `-` for standard input or standard output.",
        },

        c: {
            short: "Create archive",
            long: "Create a new archive containing the specified items.",
        },

        r: {
            short: "Append to archive",
            long: "Like -c, but new entries are appended to the archive.  Note that\
               this only works on uncompressed archives stored in regular files.\
               The -f option is required.",
        },

        t: {
            short: "List archive",
            long: "List archive contents to stdout.",
        },

        u: {
            short: "Append if mofified",
            long: "Like -r, but new entries are added only if they have a modification\
               date newer than the corresponding entry in the archive.\
               Note that this only works on uncompressed archives stored in regular\
               files.  The -f option is required.",
        },

        x: {
            short: "Extract archive",
            long: "Extract to disk from the archive.  If a file with the same name\
               appears more than once in the archive, each copy will be\
               extracted, with later copies overwriting (replacing) earlier\
               copies.",
        },

        C: {
            short: "Change directory as: -C directory",
            long: "In c and r mode, this changes the directory before adding the\
               following files.  In x mode, change directories after opening the\
               archive but before extracting entries from the archive.",
        },


        X: {
            short: "Exclude files as: -X filename",
            long: "Read a list of exclusion patterns from the specified file.  See\
               --exclude for more information about the handling of exclusions.",
        },

        T: {
            short: "filename as: -T filename",
            long: "In x or t mode, tar will read the list of names to be extracted\
               from filename.  In c mode, tar will read names to be archived\
               from filename.  The special name ``-C`` on a line by itself will\
               cause the current directory to be changed to the directory specified\
                on the following line.  Names are terminated by newlines\
               unless --null is specified.  Note that --null also disables the\
               special handling of lines containing ``-C``"
        },

        b: {
            short: "Blocksize as: -b blocksize",
            long: "Specify the block size, in 512-byte records, for tape drive I/O.\
               As a rule, this argument is only needed when reading from or\
               writing to tape drives, and usually not even then as the default\
               block size of 20 records (10240 bytes) is very common.",
        },

        "check-links": {
            short: "Warn on bad links",
            long: "(c and r modes only) Issue a warning message unless all links to\
               each file are archived."
        },

        chroot: {
            short: "Chroot before extracting",
            long: "(x mode only) chroot() to the current directory after processing\
               any -C options and before extracting any files."
        },

        "keep-newer-files": {
            short: "Don't overwrite newer files",
            long: "(x mode only) Do not overwrite existing files that are newer than\
               the versions appearing in the archive being extracted."
        },

        nodump: {
            short: "Honor the nodump flag",
            long: "(c and r modes only) Honor the nodump file flag by skipping this file."
        },

        null: {
            short: "Filenames are separated by null",
            long: "(use with -I, -T, or -X) Filenames or patterns are separated by\
               null characters, not by newlines.  This is often used to read\
               filenames output by the -print0 option to find(1)."
        },

        "numeric-owner": {
            short: "Ignore symbolic names",
            long: "(x mode only) Ignore symbolic user and group names when restoring\
               archives to disk, only numeric uid and gid values will be obeyed."
        },

        "one-file-system": {
            short: "Do not cross mount points",
            long: "(c, r, and u modes) Do not cross mount points."
        },
    },
    (option, descriptions) => mapSuggestions((option.length > 1 ? longFlag : shortFlag)(option), suggestion => suggestion.withSynopsis(
    descriptions.short).withDescription(descriptions.long))
));

PluginManager.registerAutocompletionProvider("tar", options);
